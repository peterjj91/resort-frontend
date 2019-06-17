const SftpUpload = require('sftp-upload');
const fs = require('fs');

const path = require('path');

const untildify = require('untildify');

const sshPath = untildify('~/.ssh/id_rsa');

const options = {
	host: 'front-end.fmake.ru',
	username: 'fmake',
	path: path.join(__dirname, 'dist/'),
	remoteDir: '' /* PUT PWD HERE */,
	privateKey: fs.readFileSync(sshPath),
	// passphrase: fs.readFileSync('privateKey_rsa.passphrase'),
};

const sftp = new SftpUpload(options);

sftp.on('error', err => {
	throw err;
})
	.on('uploading', progress => {
		console.log('Uploading', progress.file);
		console.log(`${progress.percent}% completed`);
	})
	.on('completed', () => {
		console.log('Upload Completed');
	})
	.upload();
