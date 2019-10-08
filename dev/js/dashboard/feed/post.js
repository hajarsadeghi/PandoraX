import { InitializePostDropzone } from './../../helper/dropzone';


InitializePostDropzone((status, res) => {
    if (status) {
        console.log('success')
    }
})