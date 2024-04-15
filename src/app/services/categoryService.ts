import { CategoryList } from '../model/category-list';
import { ProblemDetails } from './problemDetails';

export async function listCategories(idToken: string): Promise<CategoryList> {
  
  const response = await fetch(`${process.env.NEXT_PUBLIC_GUITO_API_URL}/category`, {
    headers: {
      'x-google-idtoken': idToken
    }});
  if (!response.ok) {
    const problemDetails: ProblemDetails = await response.json();
    throw problemDetails;
  }
  const categories: CategoryList = await response.json();
  return categories;
}
