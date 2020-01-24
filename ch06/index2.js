function createImage(name) {
	if (name.match(/\.jpe?g$/)) {
		return new ImageJpeg(name);
	} else if (name.match(/\.gif$/)) {
		return ImageGif(name);
	} else {
		throw new Exceptio('Upsupported format');
	}
}
