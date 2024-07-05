import styles from "./Editor.module.css";

const Editor = () => {
  return (
    <>
      <div className={styles.editor}>
        <p>Contact info</p>
        <input type="text"/>
        <p>Professional summary</p>
        <input type="text"/>
        <p>Work experience</p>
        <input type="text"/>
        <p>Education</p>
        <input type="text"/>
        <p>Skills</p>
        <input type="text"/>
        <p>Projects</p>
        <input type="text"/>
        <p>Certifications and licences</p>
        <input type="text"/>
        <p>Affiliations</p>
        <input type="text"/>
        <p>Other (input both title and desc)</p>
        <input type="text"/>
        <input type="text"/>
      </div>
    </>
  );
};

export default Editor;