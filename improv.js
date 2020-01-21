const chokidar = require('chokidar');
const {exec, execSync} = require('child_process')
const fs = require('fs')

if (!process.argv[2]  || !process.argv[3]){
  console.log('\n\nerror: \n\n1st argument should be the path to the vcv autosave file \n2nd argument should  be the path to the patch.vcv file in your assigned repo\n\n')
  process.exit()
}

let repoPath = process.argv[3].substring(0,process.argv[3].lastIndexOf("/"));


exec('git branch', {cwd: repoPath}, (stdout,stderr,err) => {
  let response =  stderr.split('\n')
  for(i = 0; i < response.length; i++){
    if(response[i].includes('*')){
      if (response[i] ===  "* master"){
        console.log('\n\nerror, currently working on master branch. \n\ncreate/switch to an improvisation branch before running this script!\n\n')
        process.exit()
      } else {
        const watcher = chokidar.watch(process.argv[2], {
          ignored: /(^|[\/\\])\../, // ignore dotfiles
          persistent: true
        });


        const log = console.log.bind(console);
        // Add event listeners.
        watcher
          .on('add', path => log(`Watching file ${path}`))
          .on('change', path => writeVCV())
        
        function writeVCV(){
          let autosave = fs.readFileSync(process.argv[2])
          fs.writeFileSync(process.argv[3], autosave)
          autoCommit()

        }

        function autoCommit(){
          exec('git status', {cwd: repoPath}, (stderr, stdout, err)=>{
            let response = stdout.split('\n')
            for (i = 0; i<response.length; i++){
              if(response[i] === 'nothing to commit, working tree clean'){
                console.log('return')
                return
              }
            }


              
            exec('git commit -am "improvisation autocommit"', {cwd: repoPath}, (stderr, stdout, err)=>{
              console.log(stdout)
            })
          })
        }
      }
    }
  }
})