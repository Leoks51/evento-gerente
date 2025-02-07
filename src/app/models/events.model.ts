export interface Events{
    id: number;
    title: string;
    description: string;
    status: 'ativo' | 'inativo';
    shortDescription: string;
    dateTime: string;
    image: string;
}