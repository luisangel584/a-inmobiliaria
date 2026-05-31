const app = 'aliseda';
const baseUrl = 'https://divine-recipe-98f9.luis-angel584.workers.dev';

export const environment = {
  propertiesUrl: `${baseUrl}/api/new-search?tipo=10&Application=${app}`,
  propertyDetailUrl: (id: string) => `${baseUrl}/api/get-property/${id}?Application=${app}`,
};
