import Article, {ArticleInterface} from "@/components/Article";
import {articles} from "@/content/articles";


interface Params {
  params: {
    urlparameter: string;
  };
}

const ArticlePage = ({params}: Params) => {
  const {urlparameter} = params;
  const article: ArticleInterface | undefined = articles.find((a) => a.urlparamater === urlparameter);

  if (!article) return <div>Article not found</div>;

  return (
    <>
      <div>
        <Article
          articleContent={article}/>
      </div>
    </>
  );
};

export default ArticlePage;