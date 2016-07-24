var ImageGallery = {};
var queryFirstImgs = function() {
    $.ajax({
        url: "../../json/imgGallery.json",
    }).done(function(data) {
        ImageGallery = data;
        addImages(data.detail[0].imgsSource);
        createImgPagination(data.imgNum);
        addImgBox();
    });
}

var getAllImgs = function(){
	var allImgs = [];

    ImageGallery.detail.forEach(function(eachpage){
        allImgs = allImgs.concat(eachpage.imgsSource);
    });

	return allImgs;

}

var createImgPagination = function(num) {
    var perPage = 8;
    var pages = Math.round(num / perPage);
    var targetPagi = $('.imgs-pagination')
    for (var i = 0; i < pages; i++) {
        var spanNode = $('<span></span>')
        spanNode.attr('data-pid', i);
        spanNode.click(clickSpan);
        targetPagi.append(spanNode);
    }
    targetPagi.children().first().addClass('selected');
}

var clickSpan = function() {
    if (!$(this).hasClass('selected')) {
        var index = parseInt($(this).attr('data-pid'));
        addImages(ImageGallery.detail[index].imgsSource);
        $('.imgs-pagination span').removeClass('selected');
        $(this).addClass('selected');
        addImgBox();

    }

}

queryFirstImgs();

var addImgBox = function() {
    var imgs = $('div.imgs-container img')
    var allImgs = getAllImgs();
    var targetPanel = $('div.img-panel');
    var targetImg = $('.img-zoom-container img');
    var leftAarow = $('.left-aarow');
    var rightAarow = $('.right-aarow');
    var closebtn = $('.fa-times');
    var imgIndicator = $('.gallery-indicator')
    var shownIndex = 0;
    imgs.each(function(index) {
        $(this).click(function() {
            var src = $(this).attr('src');
            targetImg.attr('src', src);
            targetPanel.css('display', 'block');
            shownIndex = index;
            imgIndicator.text(index+1 +'/'+ImageGallery.imgNum);
        });
    });

    closebtn.click(function() {
        targetPanel.css('display', 'none');
    });

    rightAarow.click(function() {
        if (shownIndex + 1 < ImageGallery.imgNum) {
            var src = allImgs[shownIndex + 1];
            targetImg.attr('src', src);
            shownIndex++;
            imgIndicator.text(shownIndex +1+'/'+ImageGallery.imgNum);

        }
    });

    leftAarow.click(function() {
        if (shownIndex - 1 >= 0) {
            var src = allImgs[shownIndex - 1];
            targetImg.attr('src', src);
            shownIndex--;
            imgIndicator.text(shownIndex +1 +'/'+ImageGallery.imgNum);

        }
    });

}






var addImages = function(soureArray) {
    var targetImgs = $('.imgs-container>div');
    var targetContainer = $('.imgs-container');
    targetImgs.remove();

    soureArray.forEach(function(source){
        var domSpace = '<div><img src=' + source + ' alt=""></div>';
        targetContainer.append(domSpace);
    });

};