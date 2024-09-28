import {articles} from "@/content/articles";
import Link from "next/link";
import styles from "./ArticlesPage.module.css";

const ArticlesPage = () => {
  return (
    <div className={styles.articlesbg}>
      <div className={styles.articleshero}>
        <h1>Guide articles</h1>
        <p>Here, you’ll find valuable insights on crucial topics, such as how to
          tailor your resume for specific job applications, the ideal resume
          length, and common mistakes to avoid when crafting your document. Each
          article offers practical tips and strategies to enhance your resume’s
          effectiveness, ensuring you stand out in today’s competitive job
          market.
          Whether you&apos;re starting from scratch or looking to refine your
          existing
          resume, these resources will equip you with the knowledge and tools
          needed to create a compelling and professional application. Explore
          our
          guides and take the next step towards securing your dream job!</p>
      </div>

      {
        articles.map((article, index) =>
          <Link className={styles.articleslink} key={index}
                href={`/articles/${article.urlparamater}`}>
            {article.title}
          </Link>
        )
      }
    </div>
  );
};

export default ArticlesPage;