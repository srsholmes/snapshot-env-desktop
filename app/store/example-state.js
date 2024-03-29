const state = {
  commitsTable: {
    selectedRow: null,
    selectedCommit: '6be574aed621ec5634b24de19a40fa3822e07dc0',
    commits: [
      {
        id: '6e3c4c59eed01fee6c574584dab75da33028e076',
        commitId: '6e3c4c59eed01fee6c574584dab75da33028e076',
        commitMessage: 'added snapshot to .gitignore (HEAD)',
        commitDate: '2018-03-20 09:49:29 +0000',
        author: 'Simon Holmes',
        authorEmail: 'srsholmes@gmail.com',
      },
      {
        id: '52730b1f4a100df04d0a0f0458219bea326c4455',
        commitId: '52730b1f4a100df04d0a0f0458219bea326c4455',
        commitMessage: 'added snapshot to .gitignore',
        commitDate: '2018-03-20 09:48:10 +0000',
        author: 'Simon Holmes',
        authorEmail: 'srsholmes@gmail.com',
      },
      {
        id: '6be574aed621ec5634b24de19a40fa3822e07dc0',
        commitId: '6be574aed621ec5634b24de19a40fa3822e07dc0',
        commitMessage: 'added snapshot to .gitignore',
        commitDate: '2018-03-20 09:46:50 +0000',
        author: 'Simon Holmes',
        authorEmail: 'srsholmes@gmail.com',
      },
      {
        id: 'b721d768c15f0f086eb33f40c28fdab3b9ccf2bf',
        commitId: 'b721d768c15f0f086eb33f40c28fdab3b9ccf2bf',
        commitMessage: 'removed snapshot folder',
        commitDate: '2018-03-20 09:39:39 +0000',
        author: 'Simon Holmes',
        authorEmail: 'srsholmes@gmail.com',
      },
      {
        id: '5e8eb4ad24530ddad0d5314a5abff4fb6d1021d7',
        commitId: '5e8eb4ad24530ddad0d5314a5abff4fb6d1021d7',
        commitMessage: 'removed snapshot from gitignore for test',
        commitDate: '2018-03-20 09:39:19 +0000',
        author: 'Simon Holmes',
        authorEmail: 'srsholmes@gmail.com',
      },
      {
        id: '24d9523e2ff20773424139586e90ccd3fc3cdb20',
        commitId: '24d9523e2ff20773424139586e90ccd3fc3cdb20',
        commitMessage: 'another test commit',
        commitDate: '2018-03-20 09:29:43 +0000',
        author: 'Simon Holmes',
        authorEmail: 'srsholmes@gmail.com',
      },
      {
        id: '5701059e4edb5480d6a8460bb34529a6b17ea20e',
        commitId: '5701059e4edb5480d6a8460bb34529a6b17ea20e',
        commitMessage: 'simon commit',
        commitDate: '2018-03-20 09:29:28 +0000',
        author: 'Simon Holmes',
        authorEmail: 'srsholmes@gmail.com',
      },
      {
        id: '4840c40a3ec5b4eda10c1cedc89fbb74bc58fe45',
        commitId: '4840c40a3ec5b4eda10c1cedc89fbb74bc58fe45',
        commitMessage: 'snapshottest',
        commitDate: '2018-03-16 09:21:42 +0000',
        author: 'Simon Holmes',
        authorEmail: 'srsholmes@gmail.com',
      },
      {
        id: 'b37bc94d5a90d1953ac3c1b05c1a25ffa6937947',
        commitId: 'b37bc94d5a90d1953ac3c1b05c1a25ffa6937947',
        commitMessage: 'gitignore',
        commitDate: '2018-03-16 08:58:47 +0000',
        author: 'Simon Holmes',
        authorEmail: 'srsholmes@gmail.com',
      },
      {
        id: '93e1347e2699d86dad7fb3200022a4cfc0ae673a',
        commitId: '93e1347e2699d86dad7fb3200022a4cfc0ae673a',
        commitMessage: 'gitignot',
        commitDate: '2018-03-16 08:58:05 +0000',
        author: 'Simon Holmes',
        authorEmail: 'srsholmes@gmail.com',
      },
      {
        id: '38e3b7b4d84150f8d901a8e700fdcfd246ee1b03',
        commitId: '38e3b7b4d84150f8d901a8e700fdcfd246ee1b03',
        commitMessage: 'snapshot test json',
        commitDate: '2018-03-15 09:40:58 +0000',
        author: 'Simon Holmes',
        authorEmail: 'srsholmes@gmail.com',
      },
      {
        id: 'f447f6058645185004e88822bf949881fc212320',
        commitId: 'f447f6058645185004e88822bf949881fc212320',
        commitMessage: 'hollie',
        commitDate: '2018-03-14 21:31:00 +0000',
        author: 'Simon Holmes',
        authorEmail: 'srsholmes@gmail.com',
      },
      {
        id: '53d9334963ece8d5da7fc4c33d09bf33da538e31',
        commitId: '53d9334963ece8d5da7fc4c33d09bf33da538e31',
        commitMessage: 'snapshot json',
        commitDate: '2018-03-13 10:19:27 +0000',
        author: 'Simon Holmes',
        authorEmail: 'srsholmes@gmail.com',
      },
      {
        id: '13e810c963f48348dd9e8b3f147592b17a34f5eb',
        commitId: '13e810c963f48348dd9e8b3f147592b17a34f5eb',
        commitMessage: 'another commit',
        commitDate: '2018-03-13 10:18:46 +0000',
        author: 'Simon Holmes',
        authorEmail: 'srsholmes@gmail.com',
      },
      {
        id: 'ba224c24a2e5419459872a10dffd1f7735e1a0e9',
        commitId: 'ba224c24a2e5419459872a10dffd1f7735e1a0e9',
        commitMessage: 'another commit',
        commitDate: '2018-03-13 10:18:36 +0000',
        author: 'Simon Holmes',
        authorEmail: 'srsholmes@gmail.com',
      },
      {
        id: '7ded9b8d2081c8b3dc8b1a34f104edd3c242d683',
        commitId: '7ded9b8d2081c8b3dc8b1a34f104edd3c242d683',
        commitMessage: 'snapshot json',
        commitDate: '2018-03-13 10:16:44 +0000',
        author: 'Simon Holmes',
        authorEmail: 'srsholmes@gmail.com',
      },
      {
        id: '853966499f161babd8b649439daf79ef08c2f3f1',
        commitId: '853966499f161babd8b649439daf79ef08c2f3f1',
        commitMessage: 'added snapshot to .gitignore',
        commitDate: '2018-03-13 10:00:08 +0000',
        author: 'Simon Holmes',
        authorEmail: 'srsholmes@gmail.com',
      },
      {
        id: '398fdcb473dc514680871b25f65c17556257b260',
        commitId: '398fdcb473dc514680871b25f65c17556257b260',
        commitMessage: 'forth commit',
        commitDate: '2018-03-13 09:59:44 +0000',
        author: 'Simon Holmes',
        authorEmail: 'srsholmes@gmail.com',
      },
      {
        id: 'a1e9468df018a8a63c302860cc23d891a56def50',
        commitId: 'a1e9468df018a8a63c302860cc23d891a56def50',
        commitMessage: 'third  commit',
        commitDate: '2018-03-13 09:59:33 +0000',
        author: 'Simon Holmes',
        authorEmail: 'srsholmes@gmail.com',
      },
      {
        id: 'aed9e6b42528cafcdfd36d1ff0a1f9d192d53234',
        commitId: 'aed9e6b42528cafcdfd36d1ff0a1f9d192d53234',
        commitMessage: 'second  commit',
        commitDate: '2018-03-13 09:59:15 +0000',
        author: 'Simon Holmes',
        authorEmail: 'srsholmes@gmail.com',
      },
      {
        id: 'f4d86e8da093784473a30bd67686c829025f982f',
        commitId: 'f4d86e8da093784473a30bd67686c829025f982f',
        commitMessage: 'first commit',
        commitDate: '2018-03-13 09:59:04 +0000',
        author: 'Simon Holmes',
        authorEmail: 'srsholmes@gmail.com',
      },
    ],
    order: 'asc',
    orderBy: 'commitDate',
    selected: ['6be574aed621ec5634b24de19a40fa3822e07dc0'],
    page: 0,
    rowsPerPage: 10,
    currentBranch: '6e3c4c5',
    repo: {},
  },
  git: {
    branch: null,
    commits: [
      {
        id: '6e3c4c59eed01fee6c574584dab75da33028e076',
        commitId: '6e3c4c59eed01fee6c574584dab75da33028e076',
        commitMessage: 'added snapshot to .gitignore (HEAD)',
        commitDate: '2018-03-20 09:49:29 +0000',
        author: 'Simon Holmes',
        authorEmail: 'srsholmes@gmail.com',
      },
      {
        id: '52730b1f4a100df04d0a0f0458219bea326c4455',
        commitId: '52730b1f4a100df04d0a0f0458219bea326c4455',
        commitMessage: 'added snapshot to .gitignore',
        commitDate: '2018-03-20 09:48:10 +0000',
        author: 'Simon Holmes',
        authorEmail: 'srsholmes@gmail.com',
      },
      {
        id: '6be574aed621ec5634b24de19a40fa3822e07dc0',
        commitId: '6be574aed621ec5634b24de19a40fa3822e07dc0',
        commitMessage: 'added snapshot to .gitignore',
        commitDate: '2018-03-20 09:46:50 +0000',
        author: 'Simon Holmes',
        authorEmail: 'srsholmes@gmail.com',
      },
      {
        id: 'b721d768c15f0f086eb33f40c28fdab3b9ccf2bf',
        commitId: 'b721d768c15f0f086eb33f40c28fdab3b9ccf2bf',
        commitMessage: 'removed snapshot folder',
        commitDate: '2018-03-20 09:39:39 +0000',
        author: 'Simon Holmes',
        authorEmail: 'srsholmes@gmail.com',
      },
      {
        id: '5e8eb4ad24530ddad0d5314a5abff4fb6d1021d7',
        commitId: '5e8eb4ad24530ddad0d5314a5abff4fb6d1021d7',
        commitMessage: 'removed snapshot from gitignore for test',
        commitDate: '2018-03-20 09:39:19 +0000',
        author: 'Simon Holmes',
        authorEmail: 'srsholmes@gmail.com',
      },
      {
        id: '24d9523e2ff20773424139586e90ccd3fc3cdb20',
        commitId: '24d9523e2ff20773424139586e90ccd3fc3cdb20',
        commitMessage: 'another test commit',
        commitDate: '2018-03-20 09:29:43 +0000',
        author: 'Simon Holmes',
        authorEmail: 'srsholmes@gmail.com',
      },
      {
        id: '5701059e4edb5480d6a8460bb34529a6b17ea20e',
        commitId: '5701059e4edb5480d6a8460bb34529a6b17ea20e',
        commitMessage: 'simon commit',
        commitDate: '2018-03-20 09:29:28 +0000',
        author: 'Simon Holmes',
        authorEmail: 'srsholmes@gmail.com',
      },
      {
        id: '4840c40a3ec5b4eda10c1cedc89fbb74bc58fe45',
        commitId: '4840c40a3ec5b4eda10c1cedc89fbb74bc58fe45',
        commitMessage: 'snapshottest',
        commitDate: '2018-03-16 09:21:42 +0000',
        author: 'Simon Holmes',
        authorEmail: 'srsholmes@gmail.com',
      },
      {
        id: 'b37bc94d5a90d1953ac3c1b05c1a25ffa6937947',
        commitId: 'b37bc94d5a90d1953ac3c1b05c1a25ffa6937947',
        commitMessage: 'gitignore',
        commitDate: '2018-03-16 08:58:47 +0000',
        author: 'Simon Holmes',
        authorEmail: 'srsholmes@gmail.com',
      },
      {
        id: '93e1347e2699d86dad7fb3200022a4cfc0ae673a',
        commitId: '93e1347e2699d86dad7fb3200022a4cfc0ae673a',
        commitMessage: 'gitignot',
        commitDate: '2018-03-16 08:58:05 +0000',
        author: 'Simon Holmes',
        authorEmail: 'srsholmes@gmail.com',
      },
      {
        id: '38e3b7b4d84150f8d901a8e700fdcfd246ee1b03',
        commitId: '38e3b7b4d84150f8d901a8e700fdcfd246ee1b03',
        commitMessage: 'snapshot test json',
        commitDate: '2018-03-15 09:40:58 +0000',
        author: 'Simon Holmes',
        authorEmail: 'srsholmes@gmail.com',
      },
      {
        id: 'f447f6058645185004e88822bf949881fc212320',
        commitId: 'f447f6058645185004e88822bf949881fc212320',
        commitMessage: 'hollie',
        commitDate: '2018-03-14 21:31:00 +0000',
        author: 'Simon Holmes',
        authorEmail: 'srsholmes@gmail.com',
      },
      {
        id: '53d9334963ece8d5da7fc4c33d09bf33da538e31',
        commitId: '53d9334963ece8d5da7fc4c33d09bf33da538e31',
        commitMessage: 'snapshot json',
        commitDate: '2018-03-13 10:19:27 +0000',
        author: 'Simon Holmes',
        authorEmail: 'srsholmes@gmail.com',
      },
      {
        id: '13e810c963f48348dd9e8b3f147592b17a34f5eb',
        commitId: '13e810c963f48348dd9e8b3f147592b17a34f5eb',
        commitMessage: 'another commit',
        commitDate: '2018-03-13 10:18:46 +0000',
        author: 'Simon Holmes',
        authorEmail: 'srsholmes@gmail.com',
      },
      {
        id: 'ba224c24a2e5419459872a10dffd1f7735e1a0e9',
        commitId: 'ba224c24a2e5419459872a10dffd1f7735e1a0e9',
        commitMessage: 'another commit',
        commitDate: '2018-03-13 10:18:36 +0000',
        author: 'Simon Holmes',
        authorEmail: 'srsholmes@gmail.com',
      },
      {
        id: '7ded9b8d2081c8b3dc8b1a34f104edd3c242d683',
        commitId: '7ded9b8d2081c8b3dc8b1a34f104edd3c242d683',
        commitMessage: 'snapshot json',
        commitDate: '2018-03-13 10:16:44 +0000',
        author: 'Simon Holmes',
        authorEmail: 'srsholmes@gmail.com',
      },
      {
        id: '853966499f161babd8b649439daf79ef08c2f3f1',
        commitId: '853966499f161babd8b649439daf79ef08c2f3f1',
        commitMessage: 'added snapshot to .gitignore',
        commitDate: '2018-03-13 10:00:08 +0000',
        author: 'Simon Holmes',
        authorEmail: 'srsholmes@gmail.com',
      },
      {
        id: '398fdcb473dc514680871b25f65c17556257b260',
        commitId: '398fdcb473dc514680871b25f65c17556257b260',
        commitMessage: 'forth commit',
        commitDate: '2018-03-13 09:59:44 +0000',
        author: 'Simon Holmes',
        authorEmail: 'srsholmes@gmail.com',
      },
      {
        id: 'a1e9468df018a8a63c302860cc23d891a56def50',
        commitId: 'a1e9468df018a8a63c302860cc23d891a56def50',
        commitMessage: 'third  commit',
        commitDate: '2018-03-13 09:59:33 +0000',
        author: 'Simon Holmes',
        authorEmail: 'srsholmes@gmail.com',
      },
      {
        id: 'aed9e6b42528cafcdfd36d1ff0a1f9d192d53234',
        commitId: 'aed9e6b42528cafcdfd36d1ff0a1f9d192d53234',
        commitMessage: 'second  commit',
        commitDate: '2018-03-13 09:59:15 +0000',
        author: 'Simon Holmes',
        authorEmail: 'srsholmes@gmail.com',
      },
      {
        id: 'f4d86e8da093784473a30bd67686c829025f982f',
        commitId: 'f4d86e8da093784473a30bd67686c829025f982f',
        commitMessage: 'first commit',
        commitDate: '2018-03-13 09:59:04 +0000',
        author: 'Simon Holmes',
        authorEmail: 'srsholmes@gmail.com',
      },
    ],
    repo: {},
    currentBranch: '6e3c4c5',
  },
  global: {
    modal: {
      display: false,
      message: {
        type: 'info',
        content: 'Hello Simon',
      },
    },
    snapshot: {
      taskLength: 11,
      progress: 11,
      currentTask: 'Successfully built snapshot 👍',
    },
  },
  project: {
    path: '/Users/cabbio540/Sites/tests/my-snapshot-tests',
    config: {
      build: 'npm run build',
      output: 'build',
      commit: 'ba224c24a2e5419459872a10dffd1f7735e1a0e9',
    },
  },
  router: {
    location: {
      pathname: '/',
      search: '',
      hash: '',
    },
  },
};
export default state;
