export interface IFormField {
  field?: string;
  label?: string;
  type?:
    | 'input'
    | 'select'
    | 'checkbox'
    | 'radio'
    | 'textarea'
    | 'date'
    | 'image';
  options?: Array<{ value: string; label: string }> | null;
  placeholder?: string;
  required?: boolean;
  class?: string;
  fieldsGroup?: {
    class?: string;
    fields: IFormField[];
  };
}
