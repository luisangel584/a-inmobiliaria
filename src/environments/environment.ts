const app = 'aliseda';

export const environment = {
  propertiesUrl: `/api/new-search?tipo=10&Application=${app}`,
  propertyDetailUrl: (id: string) => `/api/get-property/${id}?Application=${app}`,
};
