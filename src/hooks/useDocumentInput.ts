type DocumentType = 'cpf' | 'cnpj';

export type DocumentUtils = {
    format: (raw?: string) => string;
    detectType: (raw?: string) => DocumentType | undefined;
};