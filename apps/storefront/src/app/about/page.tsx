import { loadAboutPage } from "./fetchData";

export default async function Index() {
  const {content} = await loadAboutPage()
  console.log(content)
  return (
    <div dangerouslySetInnerHTML={{ __html: content }} />
  );
}
