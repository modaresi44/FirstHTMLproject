var DISQUSWIDGETS,disqus_domain,disqus_shortname;
typeof DISQUSWIDGETS==="undefined"&&(DISQUSWIDGETS=function(){var f=document,a=f.getElementById("dsq-count-scr"),a=a&&a.src.match(/(https?:)?\/\/(?:www\.)?([\w_\-]+)\.((?:dev\.)?disqus\.(?:com|org)(?::\d+)?)/i),d={},r=f.head||f.body,k={},s={identifier:1,url:2};d.domain=a&&a[3]||disqus_domain||"disqus.com";d.forum=a&&a[2]||disqus_shortname;d.proto=a&&a[1]||"";d.getCount=function(i){var b,c;b=encodeURIComponent;var e=d.proto+"//"+d.forum+"."+d.domain+"/count-data.js?",a=[],l=0,m=10,t="",i=i||{};i.reset&&
(k={},t="&_="+ +new Date);for(var i=[f.getElementsByTagName("A"),f.getElementsByClassName&&f.getElementsByClassName("disqus-comment-count")||[]],n,j,g,h,o=0;o<i.length;o++){n=i[o];for(var p=0;p<n.length;p++){j=n[p];g=j.getAttribute("data-disqus-identifier");h=j.hash==="#disqus_thread"&&j.href.replace("#disqus_thread","")||j.getAttribute("data-disqus-url");if(g)h=s.identifier;else if(h)g=h,h=s.url;else continue;var q;k.hasOwnProperty(g)?q=k[g]:(q=k[g]={elements:[],type:h},a.push(b(h)+"="+b(g)));q.elements.push(j)}}a.sort();
for(b=a.slice(l,m);b.length;)c=f.createElement("script"),c.src=e+b.join("&")+t,r.appendChild(c),l+=10,m+=10,b=a.slice(l,m);var u=!1;(function(a){c=f.createElement("script");c.src="https://c.disquscdn.com/next/current/embed/jester.js";c.onload=c.onreadystatechange=a;r.appendChild(c)})(function(){u||(u=!0,window.DISQUS.jester.event({verb:"load",object_type:"link",object_id:window.location.href,product:"comment-count",zone:"comment-count"}))})};d.displayCount=function(a){for(var b,c,e,d=a.counts,a=a.text.comments;b=d.shift();)if(c=
k[b.id]){switch(b.comments){case 0:e=a.zero;break;case 1:e=a.one;break;default:e=a.multiple}b=e.replace("{num}",b.comments);c=c.elements;for(e=c.length-1;e>=0;e--)c[e].innerHTML=b}};return d}());DISQUSWIDGETS.getCount();