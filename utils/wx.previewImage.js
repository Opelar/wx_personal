/**
 * @author opelar
 * @param {* string 当前点击图片的url} src 
 * @param {* Array bannner图的url数组} banner 
 * @param {* Array 文章图片数组} artImg 
 */
function wxPreview(src, banner, artImg) {
  //统一前缀，防止cnd 地址 造成 current传进去不生效
  let url = 'http://img.vvtrip.net/';
  let arr = [];

  if (!src || (typeof src) !== "string") return src;

  if (banner && Array.isArray(banner)) {
    banner.map(item =>
      arr.push(url + (item.ImgCloudUrl || item))
    );
  } 

  if (artImg && Array.isArray(artImg)) {
    artImg.map(val => {
      val.ProType === "2" || val.type === 2
        ? arr.push(url + (val.ProfileContent || val.content))
        : val
    });
  } 

  return wx.previewImage({
    current: src,
    urls: arr
  })
}

export default wxPreview;