# OPD Professional Score (OPD PS)
This is group project of ITMO students, representing Website for psychological tests and professional orientaion

## How to work with project:
### Setup for the first time
0. Check git is installed on your local machine, if not then download it <a href="https://git-scm.com/downloads">here</a>
  After installing you must configure your account:
  ```
    git config --global user.name "your name"
    git config --global user.email "your email"
  ```
1.  Clone the main branch into your local machine using this command: ` git clone https://github.com/scobca/opd-professional-score.git `
2.  Create your own branch where you will make changes: ` git branch <your branch name> `
3.  Switch into created branch that you've just made: ` git checkout <your branch name> `
### Upload changes
1. In your local branch run this command to add all changed files: ` git add . `
2. Create commit using ` git commit -m "your message in double quotes" `
3. Upload changes on Github ` git push origin <your branch name> `

### After sending your changes
If your branch appeared in our Github repository, I will check changes and open pull request or manually merge them into main branch, so before making other changes you will need to update main branch on your local machine and remove old branch
1. Switch back to main branch: ` git checkout main `
2. Update main branch: ` git pull main `
3. Remove old branch, now it's unnecessary: ` git branch -d <your branch name> `
I will check changes in your branch and open pull request or manually merge them into main branch, so before making other changes
### After all these steps you should repeat all steps from 2 step of Setup section
