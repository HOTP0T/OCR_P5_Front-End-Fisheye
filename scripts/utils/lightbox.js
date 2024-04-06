// class MediaFactory {
//   constructor(data) {
//     if (data.image) {
//       return new ImageMedia(data);
//     } else if (data.video) {
//       return new VideoMedia(data);
//     }
//     throw new Error("Unsupported media type");
//   }
// }

// class ImageMedia {
//   constructor({ title, image }) {
//     this.title = title;
//     this.src = image;
//     this.element = this.createElement();
//   }

//   createElement() {
//     const img = document.createElement('img');
//     img.src = this.src;
//     img.alt = this.title;
//     return img;
//   }
// }

// class VideoMedia {
//   constructor({ title, video }) {
//     this.title = title;
//     this.src = video;
//     this.element = this.createElement();
//   }

//   createElement() {
//     const video = document.createElement('video');
//     video.controls = true;
//     const source = document.createElement('source');
//     source.src = this.src;
//     video.appendChild(source);
//     return video;
//   }
// }
