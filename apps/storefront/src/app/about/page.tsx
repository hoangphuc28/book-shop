import { loadAboutPage } from "./fetchData";

export default async function Index() {
  const {content} = await loadAboutPage()
  return (
    <div dangerouslySetInnerHTML={{ __html: content }} />
  );
}
