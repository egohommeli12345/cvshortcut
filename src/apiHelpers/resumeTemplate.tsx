import {ResumeDataInterface} from "@/components/ResumeContext";
import * as fs from "node:fs";
import path from "node:path";

export const resumeTemplate = (resumeData: ResumeDataInterface) => `
<html>
  <head>
    ${cssStyles()}
  </head>
  <body>
    <div class="preview">
    <div class="content">
      <div class="contentstart">
        
        ${(resumeData.name?.length > 0 || resumeData.title?.length > 0) ? `
          <div class="section">
            <h2 class="name">${resumeData.name}</h2>
            <p class="title">${resumeData.title}</p>
          </div>
        ` : ''}

        ${(resumeData.address?.length > 0 || resumeData.phone?.length > 0 || resumeData.email?.length > 0) ? `
          <div class="section">
            <div class="address">
              ${resumeData.address?.length > 0 ? `<p><strong>Address: </strong>${resumeData.address}</p>` : ''}
              ${resumeData.phone?.length > 0 ? `<p><strong>Phone: </strong>${resumeData.phone}</p>` : ''}
              ${resumeData.email?.length > 0 ? `<p><strong>E-mail: </strong>${resumeData.email}</p>` : ''}
            </div>
          </div>
        ` : ''}

        ${resumeData.summary?.length > 0 ? `
          <div class="section">
            <div class="summary">
              <p>${resumeData.summary}</p>
            </div>
          </div>
        ` : ''}

        ${resumeData.experience?.length > 0 ? `
          <div class="section">
            <div class="experience">
              <h3>Experience</h3>
              <div class="entries">
                ${resumeData.experience.map((exp) => `
                  <div class="entry">
                    <p class="fromto">${exp.from} - ${exp.to}</p>
                    <div class="gapeight">
                      <div>
                        <h4>${exp.worktitle}</h4>
                        <i>${exp.workplacename}</i>
                      </div>
                      <ul>
                        ${exp.listitem.map((item) => `<li>${item}</li>`).join('')}
                      </ul>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        ` : ''}

        ${resumeData.education?.length > 0 ? `
          <div class="section">
            <div class="education">
              <h3>Education</h3>
              <div class="entries">
                ${resumeData.education.map((edu) => `
                  <div class="entry">
                    <p class="fromto">${edu.from} - ${edu.to}</p>
                    <div class="gapeight">
                      <div>
                        <h4>${edu.schoolname}</h4>
                      </div>
                      <ul>
                        ${edu.listitem.map((item) => `<li>${item}</li>`).join('')}
                      </ul>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        ` : ''}

        ${resumeData.skills?.length > 0 ? `
          <div class="section">
            <div class="skills">
              <h3>Skills</h3>
              <div class="entries">
                ${resumeData.skills.map((skill) => `
                  <div class="entry">
                    <div></div>
                    <p><strong>${skill.title}</strong> - ${skill.text}</p>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        ` : ''}
        
      </div>
    </div>
  </div>
  </body>
</html>
`;


export const resumeTemplateMock = () => `
<html>
  <head>
    <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" rel="stylesheet">
    ${cssStyles()}
  </head>
  <body>
    <div class="preview">
    <div class="content">
      <div class="contentstart">

        <div class="section">
          <h2 class="name">Samuli Pirnes</h2>
          <p class="title">Fullstack software engineer</p>
        </div>

        <div class="section">
          <div class="address">
            <p><strong>Address: </strong>33720 Tampere</p>
            <p><strong>Phone: </strong>040 7158353</p>
            <p><strong>E-mail: </strong>pirnes.samuli@gmail.com</p>
          </div>
        </div>

        <div class="section">
          <div class="summary">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
              do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis nostrud exercitation ullamco
              laboris nisi ut aliquip ex ea commodo consequat. Duis aute
              irure dolor in reprehenderit in voluptate velit esse cillum
              dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum.</p>
          </div>
        </div>

        <div class="section">
          <div class="experience">
            <h3>Experience</h3>

            <div class="entries">

              <div class="entry">
                <p class="fromto">2024 - present</p>
                <div class="gapeight">
                  <div>
                    <h4>Work title</h4>
                    <i>Where worked</i>
                  </div>
                  <ul>
                    <li>Lorem ipsum odor amet, consectetuer adipiscing elit.
                    </li>
                    <li>Proin eu tellus purus fusce eros egestas nulla.</li>
                    <li>Urna vestibulum nisl ipsum torquent commodo hac sed
                      consectetur.
                    </li>
                    <li>Porta mauris nec nisi et quam ullamcorper.</li>
                  </ul>
                </div>
              </div>

              <div class="entry">
                <p class="fromto">2024 - present</p>
                <div class="gapeight">
                  <div>
                    <h4>Work title</h4>
                    <i>Where worked</i>
                  </div>
                  <ul>
                    <li>Lorem ipsum odor amet, consectetuer adipiscing elit.
                    </li>
                    <li>Proin eu tellus purus fusce eros egestas nulla.</li>
                    <li>Urna vestibulum nisl ipsum torquent commodo hac sed
                      consectetur.
                    </li>
                    <li>Porta mauris nec nisi et quam ullamcorper.</li>
                  </ul>
                </div>
              </div>

              <div class="entry">
                <p class="fromto">2024 - present</p>
                <div class="gapeight">
                  <div>
                    <h4>Work title</h4>
                    <i>Where worked</i>
                  </div>
                  <ul>
                    <li>Lorem ipsum odor amet, consectetuer adipiscing elit.
                    </li>
                    <li>Proin eu tellus purus fusce eros egestas nulla.</li>
                    <li>Urna vestibulum nisl ipsum torquent commodo hac sed
                      consectetur.
                    </li>
                    <li>Porta mauris nec nisi et quam ullamcorper.</li>
                  </ul>
                </div>
              </div>

            </div>

          </div>
        </div>

        <div class="section">
          <div class="education">
            <h3>Education</h3>

            <div class="entries">

              <div class="entry">
                <p class="fromto">2020-12 - 2024-12</p>
                <div class="gapeight">
                  <div>
                    <h4>Where went to school</h4>
                  </div>
                  <ul>
                    <li>Lorem ipsum odor amet, consectetuer adipiscing elit.
                    </li>
                    <li>Proin eu tellus purus fusce eros egestas nulla.</li>
                  </ul>
                </div>
              </div>

              <div class="entry">
                <p class="fromto">2020-12 - 2024-12</p>
                <div class="gapeight">
                  <div>
                    <h4>Where went to school</h4>
                  </div>
                  <ul>
                    <li>Lorem ipsum odor amet, consectetuer adipiscing elit.
                    </li>
                    <li>Proin eu tellus purus fusce eros egestas nulla.</li>
                    <li>Porta mauris nec nisi et quam ullamcorper.</li>
                  </ul>
                </div>
              </div>

            </div>

          </div>
        </div>

        <div class="section">
          <div class="skills">
            <h3>Skills</h3>
            <div class="entries">
              <div class="entry">
                <div></div>
                <p><strong>Skill title here</strong> - Additional
                  information of
                  the skill</p>
              </div>
              <div class="entry">
                <div></div>
                <p><strong>Skill title here</strong> - Urna vestibulum nisl
                  ipsum torquent commodo hac sed consectetur.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
  </body>
</html>
`;

const readFontAsBase64 = (fontPath: string) => {
  const fontBuffer = fs.readFileSync(fontPath);
  return fontBuffer.toString('base64');
};

const cssStyles = () => {
  // Fonts
  const variableFontBase64 = readFontAsBase64(path.join(process.cwd(), "public", "fonts", "InterVariable.ttf"));
  const variableItalicFontBase64 = readFontAsBase64(path.join(process.cwd(), "public", "fonts", "InterVariable-Italic.ttf"));

  return `
<style>
@font-face {
  font-family: "Inter";
  src: url(data:font/ttf;base64,${variableFontBase64}) format("truetype");
  font-weight: 100 900;
  font-style: normal;
}

@font-face {
  font-family: "Inter";
  src: url(data:font/ttf;base64,${variableItalicFontBase64}) format("truetype");
  font-weight: 100 900;
  font-style: italic;
}

* {
  margin: 0;
  font-family: 'Inter', sans-serif;
}
          
body {
  font-size: 16px;
}
        
.preview {
  display: flex;
  flex-direction: column;
  height: auto;
}

.content {
  width: 100%;
  background-color: #ffffff;
  box-sizing: border-box;
  padding: 10mm;
}
          
.contentstart {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.section {
  display: flex;
  flex-direction: column;
  font-size: 16px;
}

.section h3 {
  /*font-size: 18px;*/
}

.name {
  /*font-size: 24px;*/
}

.title {
  font-size: 20px;
}

.address {
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 12px;
}

.summary {
  font-size: 16px;
}

.experience, .education, .skills {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.entries {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.entry {
  display: grid;
  grid-template-columns: 25% 75%;
}

.gapeight {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.fromto {
  font-size: 12px;
}

.entry ul {
  padding: 0;
  list-style-position: inside;
}
</style>
`;
};