'use client'

import { Accordion } from '@mantine/core'

type JourneyStep = {
  page: string
  utm_campaign: string | null
  ts: string
}

type FbclidJourneyItem = {
  fbclid: string
  journey: JourneyStep[]
}

export function FbclidJourneyList({ data }: { data: FbclidJourneyItem[] }) {
  return (
    <Accordion variant="separated">
      {data.map((item, i) => (
        <Accordion.Item value={`fbclid-${i}`} key={i}>
          <Accordion.Control>fbclid: {item.fbclid}</Accordion.Control>
          <Accordion.Panel>
            {item.journey.map((step, index: number) => (
              <div key={index} className="text-sm text-gray-700 mb-1">
                <strong>{step.page}</strong> ({step.utm_campaign || 'sem campanha'})<br />
                <span className="text-xs text-gray-500">{step.ts}</span>
              </div>
            ))}
          </Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion>
  )
}
