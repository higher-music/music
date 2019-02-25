export default function $import(path, type, title){
  var s, i;
  if (!type) type = path.substr(path.lastIndexOf('.') + 1);
  if (type == 'js'){
    var ss = document.getElementsByTagName('script');
    for (i = 0; i < ss.length; i++){
      if (ss[i].src && ss[i].src.indexOf(path) != -1 || ss[i].title == title) return ss[i];
    }
    s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = path;
    if (title) s.title = title;
  } else if (type == 'css'){
    var ls = document.getElementsByTagName('link');
    for (i = 0; i < ls.length; i++){
      if (ls[i].href && ls[i].href.indexOf(path) != -1 || ls[i].title == title) return ls[i];
    }
    s = document.createElement('link');
    s.rel = 'stylesheet';
    s.href = path;
    if (title) s.title = title;
    s.disabled = false;
  } else return;
  var head = document.getElementsByTagName('head')[0];
  head.appendChild(s);
  return s;
}
