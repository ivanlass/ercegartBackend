const cloudinary = require('cloudinary').v2;


cloudinary.config({
    cloud_name: 'dwejxcshz',
    api_key: '524956264897297',
    api_secret: 'A15W2TnmhGgMnfrqAE-KyW44PSY'
});



exports.uploads = (file, folder) => {
    return new Promise(resolve => {
        cloudinary.uploader.upload(file, (result) => {
            resolve({
                url:result.secure_url,
                id:result.public_id
            },{
                resource_type:"auto",
                folder:folder
            })
        })
    })
}