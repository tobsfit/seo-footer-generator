import showAlert from '../alert/alert';

export class FileHandler {
  file: any;
  editor: any;
  prefill: any;

  uploadJson() {
    const files: any = this.file;
    const file = files.files[0];
    const jsonType = /json.*/;
    const textType = /(text|txt).*/;

    if (files.files.length === 0) {
      showAlert('No file selected.');
      return;
    }

    const processFile = (type: string, editor: any) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        let result: any = reader.result;
        if (result.length <= 0) return;

        // Destroy editor.js
        editor.destroy();

        // Create new editor.js and prefill data from json
        if (type === 'config') result = JSON.parse(result);
        this.prefill(result, type);
      }
      reader.readAsText(file);
    }

    if (file.type.match(jsonType)) {
      processFile('config', this.editor);
    }

    if (file.type.match(textType)) {
      processFile('content', this.editor);
    }
  }
}