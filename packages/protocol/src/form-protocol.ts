/* eslint-disable @typescript-eslint/no-invalid-void-type */
import type { FormContext } from './data/form';
import type { FormEditor } from './data/form-data';

export interface FormRequestTypes {
  data: [FormContext, FormEditor];
}
