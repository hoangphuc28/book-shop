import clientWithoutAuth from "../../utils/api/graphQL/apolloClientWithoutAuth";
import { getAboutPage } from "../../utils/api/graphQL/query";


export const loadAboutPage = async () => {
  const aboutPageQuery = await clientWithoutAuth.query({
    query: getAboutPage});
  return {
    content: aboutPageQuery.data.getAboutPage
  };
};
