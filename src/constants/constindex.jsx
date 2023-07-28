import enJsonFile from '../components/Languages/translation/en.json'
import vnJsonFile from '../components/Languages/translation/vi.json'

export const EN_TRANSLATE = enJsonFile;
export const VI_TRANSLATE = vnJsonFile;
export const vietregex = /[À|Á|Â|Ã|È|Ê|Ì|Í|Ò|Ó|Ô|Õ|Ù|Ú|Ý|à|á|â|ã|è|é|ê|ì|í|ò|ó|ô|õ|ù|ú|ý|Ă|ă|Đ|đ|Ĩ|ĩ|Ũ|ũ|Ơ|ơ|Ư|ư|Ạ|ạ|Ả|ả|Ấ|ấ|Ầ|ầ|Ẩ|ẩ|Ẫ|ẫ|Ậ|ậ|Ắ|ắ|Ằ|ằ|Ẳ|ẳ|Ẵ|ẵ|Ặ|ặ|Ẹ|ẹ|Ẻ|ẻ|Ẽ|ẽ|Ế|ế|Ề|ề|Ể|ể|Ễ|ễ|Ệ|ệ|Ỉ|ỉ|Ị|ị|Ọ|ọ|Ỏ|ỏ|Ố|ố|Ồ|ồ|Ổ|ổ|Ỗ|ỗ|Ộ|ộ|Ớ|ớ|Ờ|ờ|Ở|ở|Ỡ|ỡ|Ợ|ợ|Ụ|ụ|Ủ|ủ|Ứ|ứ|Ừ|ừ|Ử|ử|Ữ|ữ|Ự|ự|Ỳ|ỳ|Ỵ|ỵ|Ỷ|ỷ|Ỹ|ỹ]/;
export const japregex = /[\u3000-\u303F]|[\u3040-\u309F]|[\u30A0-\u30FF]|[\uFF00-\uFFEF]|[\u4E00-\u9FAF]|[\u2605-\u2606]|[\u2190-\u2195]|\u203B/g;
export const backlocale = 'http://localhost:5000/';