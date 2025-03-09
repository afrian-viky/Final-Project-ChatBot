import * as React from "react";
import { ChartBarSquareIcon, CloudArrowUpIcon, SparklesIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline'

const features = [
  {
    name: 'Document Analysis',
    description:
      'Upload your CSV files and get detailed insights into your energy usage. Identify patterns and inefficiencies with precision.',
    icon: CloudArrowUpIcon,
  },
  {
    name: 'General Chat Functionality',
    description:
      'Engage with a versatile chatbot that can answer questions about energy management, smart devices, and more.',
    icon: ChatBubbleLeftRightIcon,
  },
  {
    name: 'Interactive Dashboard',
    description:
      'Displays analyzed data through graphs or tables in a user-friendly interface',
    icon: ChartBarSquareIcon,
  },
  {
    name: 'Optimization Suggestions',
    description:
      'Receive actionable recommendations to minimize energy consumption. Implement smart solutions to reduce costs and improve sustainability.',
    icon: SparklesIcon,
  },
]

export default function Example() {
  return (
    <div id="features" className="bg-[#edf7fd] py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base/7 font-semibold text-indigo-600">Data Analysis Chatbot</h2>
          <p className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl lg:text-balance">
          Everything you need to manage energy in your smart home
          </p>
          <p className="mt-6 text-lg/8 text-gray-600">
          Revolutionize how you analyze and optimize energy consumption with these powerful features tailored for smart home environments.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base/7 font-semibold text-gray-900">
                  <div className="absolute left-0 top-0 flex size-10 items-center justify-center rounded-lg bg-indigo-600">
                    <feature.icon aria-hidden="true" className="size-6 text-white" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base/7 text-gray-600">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}