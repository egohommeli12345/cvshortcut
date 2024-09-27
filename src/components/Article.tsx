import styles from "./Article.module.css";

export interface ArticleInterface {
  title: string,
  paragraphs: string[],
  urlparamater: string
}

const Article = ({articleContent}: { articleContent: ArticleInterface }) => {
  return (
    <>
      <div className={styles.articlebg}>
        <h1 className={styles.title}>{articleContent.title}</h1>
        <div className={styles.pcontainer}>
          {articleContent.paragraphs.map((p, index) =>
            <p key={index} className={styles.paragraph}>{p}</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Article;