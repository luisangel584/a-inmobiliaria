const app = 'aliseda';
const baseUrl = 'https://laravelpre.alisedainmobiliaria.com';

export const environment = {
  propertiesUrl: `${baseUrl}/api/new-search?tipo=10&Application=${app}`,
  propertyDetailUrl: (id: string) => `${baseUrl}/api/get-property/${id}?Application=${app}`,
};
