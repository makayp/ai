export interface Model {
  id: string;
  label: string;
  apiIdentifier: string;
  description: string;
}

export const models: Array<Model> = [
  {
    id: 'gpt-4o-mini',
    label: 'GPT 4o mini',
    apiIdentifier: 'gpt-4o-mini',
    description: 'Small model for fast, lightweight tasks',
  },
  {
    id: 'others',
    label: 'Others',
    apiIdentifier: 'coming soon',
    description: 'coming soon',
  },
] as const;

export const DEFAULT_MODEL_NAME: string = 'gpt-4o-mini';
