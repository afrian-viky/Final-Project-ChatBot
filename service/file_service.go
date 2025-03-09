package service

import (
	repository "a21hc3NpZ25tZW50/repository/fileRepository"
	"fmt"
	"strings"
)

type FileService struct {
	Repo *repository.FileRepository
}

func (s *FileService) ProcessFile(fileContent string) (map[string][]string, error) {
	lines := strings.Split(strings.TrimSpace(fileContent), "\n")
	if len(lines) < 2 {
		return nil, fmt.Errorf("invalid CSV data: insufficient rows")
	}

	headers := strings.Split(lines[0], ",")
	if len(headers) == 0 {
		return nil, fmt.Errorf("invalid CSV data: missing headers")
	}

	result := make(map[string][]string)
	for _, header := range headers {
		result[header] = []string{}
	}

	for i, line := range lines[1:] {
		if line == "" {
			continue
		}
		values := strings.Split(line, ",")
		if len(values) != len(headers) {
			return nil, fmt.Errorf("row %d has incorrect number of columns", i+2)
		}
		for j, value := range values {
			result[headers[j]] = append(result[headers[j]], strings.TrimSpace(value))
		}
	}

	return result, nil
}
