FilePond.registerPlugin(
    FilePondPluginImagePreview,
    FilePondPluginImageResize,
    FilePondPluginFileEncode,
    FilePondPluginImageTransform
);

FilePond.setOptions({
    stylePanelAspectRatio: 50/25,
    imageResizeTargetWidth: 200,
    imageResizeTargetHeight: 325
})

FilePond.parse(document.body);
