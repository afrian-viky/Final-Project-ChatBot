package service

import (
	"a21hc3NpZ25tZW50/model"
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"strings"
)

type HTTPClient interface {
	Do(req *http.Request) (*http.Response, error)
}

type AIService struct {
	Client HTTPClient
}

func removeInvalidWords(answer string) string {
	invalidWords := []string{"SUM", "AVERAGE", "MEAN", "TOTAL"}
	for _, word := range invalidWords {
		answer = strings.ReplaceAll(answer, word, "")
	}
	return strings.TrimSpace(answer)
}

func removeDuplicates(answer string, validValues []string) string {
	elements := strings.Split(answer, ",")
	uniqueElements := make(map[string]bool)
	result := []string{}

	validMap := make(map[string]bool)
	for _, val := range validValues {
		validMap[strings.TrimSpace(val)] = true
	}

	for _, element := range elements {
		element = strings.TrimSpace(element)
		element = removeInvalidWords(element)

		if _, exists := uniqueElements[element]; !exists && validMap[element] {
			uniqueElements[element] = true
			result = append(result, element)
		}
	}

	return strings.Join(result, ", ")
}

func (s *AIService) AnalyzeData(table map[string][]string, query, token string) (string, error) {
	if len(table) == 0 {
		return "", fmt.Errorf("empty table data")
	}

	reqBody, err := json.Marshal(model.AIRequest{
		Inputs: model.Inputs{
			Table: table,
			Query: query,
		},
	})
	if err != nil {
		return "", fmt.Errorf("failed to marshal request data: %w", err)
	}

	req, err := http.NewRequest("POST", "https://api-inference.huggingface.co/models/google/tapas-large-finetuned-wtq", bytes.NewBuffer(reqBody))
	if err != nil {
		return "", fmt.Errorf("failed to create HTTP request: %w", err)
	}
	req.Header.Set("Authorization", "Bearer "+token)
	req.Header.Set("Content-Type", "application/json")

	resp, err := s.Client.Do(req)
	if err != nil {
		return "", fmt.Errorf("failed to send HTTP request: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		respBody, _ := io.ReadAll(resp.Body)
		return "", fmt.Errorf("AI model response not OK, status code: %d, body: %s", resp.StatusCode, string(respBody))
	}

	var response model.TapasResponse
	if err := json.NewDecoder(resp.Body).Decode(&response); err != nil {
		return "", fmt.Errorf("failed to decode AI response: %w", err)
	}

	if response.Answer == "" {
		return "", fmt.Errorf("empty result from AI response")
	}

	validValues := extractValidValuesFromTable(table)

	return removeDuplicates(response.Answer, validValues), nil
}

func extractValidValuesFromTable(table map[string][]string) []string {
	validValues := []string{}
	for _, columnData := range table {
		validValues = append(validValues, columnData...)
	}
	return validValues
}

func (s *AIService) ChatWithAI(query, token string) (string, error) {
	// Membuat request body
	reqBody, err := json.Marshal(model.Payload{
		Model: "command-r-plus-08-2024",
		Messages: []model.Message{
			{
				Role:    "user",
				Content: query,
			},
		},
	})
	if err != nil {
		return "", fmt.Errorf("gagal membuat body request: %w", err)
	}

	req, err := http.NewRequest("POST", "https://api.cohere.com/v2/chat", bytes.NewBuffer(reqBody))
	if err != nil {
		return "", fmt.Errorf("gagal membuat request: %w", err)
	}
	req.Header.Set("Authorization", "Bearer "+token)
	req.Header.Set("Content-Type", "application/json")

	resp, err := s.Client.Do(req)
	if err != nil {
		return "", fmt.Errorf("gagal menjalankan request: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		respBody, _ := io.ReadAll(resp.Body)
		return "", fmt.Errorf("respon model AI tidak OK, status code: %d, body: %s", resp.StatusCode, string(respBody))
	}

	var chatResponse model.ChatResponse
	err = json.NewDecoder(resp.Body).Decode(&chatResponse)
	if err != nil {
		return "", fmt.Errorf("gagal membaca respon model AI: %w", err)
	}

	if len(chatResponse.Message.Content) == 0 {
		return "", fmt.Errorf("respon model AI kosong: content tidak ditemukan")
	}

	if chatResponse.Message.Content[0].Text == "" {
		return "", fmt.Errorf("respon model AI tidak memiliki teks")
	}

	return chatResponse.Message.Content[0].Text, nil
}
