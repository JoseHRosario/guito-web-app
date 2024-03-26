import { CategoryList } from '../model/category-list';

export async function listCategories(idToken: string): Promise<CategoryList> {
  
  const response = await fetch(`${process.env.NEXT_PUBLIC_GUITO_API_URL}/category`, {
    headers: {
      'x-google-idtoken': idToken
    }});
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const categories: CategoryList = await response.json();
  return categories;
}
