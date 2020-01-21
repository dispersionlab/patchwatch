# improv watcher
Auto-commits when the vcv autosave file changes. 

required:

- nodejs
https://nodejs.org/en/

To run:

1. open terminal, change the directory into this folder
2. VCV rack autosaves patches in a generic file called 'autosave-v1.vcv'. On mac this is located in ~/Documents/Rack/autosave-v1.vcv. I *believe* its also in Documents on PC. Locate the path to this file and write it somewhere (i.e. in a text editor). 
3. Get the path to the patch.vcv file in the repo you're assigned to. 
4.  make sure that the repo you're assigned to is set to an improvisation branch (see the wiki https://github.com/dispersionlab/gitshow/wiki/in-class-procedures)
5. run the improv watcher, and pass it the filepaths to the autosave and patch.vcv (in that order):
```shell
node improv.js /full/path/to/autosave-v1.vcv /full/path/to/gitshowNNN/patch.vcv
```

With the script running, any changes you make to the patcher while improvising will be committed.
