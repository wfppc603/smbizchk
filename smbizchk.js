var http = require('http');
var url = require('url');
var qs = require('querystring');
var request2 = require('request');

// 서버 생성
http.createServer( function (request2, response) {  
	// URL 뒤에 있는 디렉토리/파일이름 파싱

	//var pathname = url.parse(request.url).pathname;
	//console.log("Request for " + pathname + " received.");

	//var search = url.parse(request.url).search;
	//console.log("Request for " + search + " received.");

	var query = url.parse(request2.url).query;
	//console.log("Request for " + query + " received.");
   
	var querystring = qs.parse(query);
	//console.log(querystring);

	var biz_no = qs.parse(query).biz_no;
	//console.log(biz_no);

	var cheerio = require('cheerio');  
	var request = require('request');

	var kiscode = "";

	var result = "";
	
	var src1 = 'https://www.nicebizinfo.com/ep/EP0100M001GE.nice?itgSrch=' + biz_no;  
	
	request(src1, function(error1, response1, html1){  
	
		if (error1) {
			throw error1
			console.log (error1);
		};

		//console.log (html);

		var $1 = cheerio.load(html1);
		//var html1 = html1;
		
		var _txt = html1.split("showDtlView");
		var _txt0 = _txt[1];
		var biz_nm = _txt[1].split("</a>")[0].split(">")[1];
		
		console.log("사업자번호 : " + biz_no );
		console.log("사업자명 : " + biz_nm);
		result = result + ("사업자번호 : " + biz_no) + "<br />";
		result = result + ("사업자명 : " + biz_nm) + "<br />";

		$1('#EP0100M001GE_kiscode0').each(function(){
			kiscode = $1(this).attr('value');
		})


		var src2 = 'https://www.nicebizinfo.com/ep/EP0100M002GE.nice?kiscode=' + kiscode;  
		
		request(src2, function(error2, response2, html2){  
			if (error2) {
				throw error2
				console.log (error2);
			};

			//console.log (src2);

			var $2 = cheerio.load(html2);
			
			//var html2 = html;
			//console.log("html : " + $2 );
			
			/*
			txt0a
			대표자
			txt0b	txt1a
					본사주소
					txt1b	txt2a
							그룹명
							txt2b	txt3a
									사업자번호
									txt3b	txt4a
											기업형태
											txt4b
			txt5
			산업
			txt6
			설립일자
			txt7
			상장일자
			txt8
			
			*/
			
			var txt0a = html2.split("대표자")[0];
			var txt0b = html2.split("대표자")[1];
			var txt0c = txt0b.split("</strong>")[0].split("<strong>")[1];
			console.log("대표자 : " + txt0c);
			result = result + ("대표자 : " + txt0c) + "<br />";
			
			
			var txt1a = txt0b.split("본사주소")[0];
			var txt1b = txt0b.split("본사주소")[1];
			var txt1c = txt1b.split("</strong>")[0].split("<strong>")[1];
			console.log("본사주소 : " + txt1c);
			result = result + ("본사주소 : " + txt1c) + "<br />";
			
			var txt2a = txt1b.split("그룹명")[0];
			var txt2b = txt1b.split("그룹명")[1];
			var txt2c = txt2b.split("</strong>")[0].split("<strong>")[1];
			console.log("그룹명 : " + txt2c);
			result = result + ("그룹명 : " + txt2c) + "<br />";
			
			var txt3a = txt2b.split("사업자번호")[0];
			var txt3b = txt2b.split("사업자번호")[1];
			var txt3c = txt3b.split("</strong>")[0].split("<strong>")[1];
			//console.log("사업자번호 : " + txt3c);
			
			var txt4a = txt3b.split("기업형태")[0];
			var txt4b = txt3b.split("기업형태")[1];
			var txt4c = txt4b.split("</strong>")[0].split("<strong>")[1];
			console.log("기업형태 : " + txt4c);
			result = result + ("기업형태 : " + txt4c) + "<br />";
			
			var txt5a = txt4b.split("산업")[0];
			var txt5b = txt4b.split("산업")[1];
			txt5b = txt5b.replace("설립일자 및","");
			var txt5c = txt5b.split("</strong>")[0].split("<strong>")[1];
			console.log("산업 : " + txt5c);
			result = result + ("산업 : " + txt5c) + "<br />";
			
			var txt6a = txt5b.split("설립일자")[0];
			var txt6b = txt5b.split("설립일자")[1];
			var txt6c = txt6b.split("</strong>")[0].split("<strong>")[1];
			console.log("설립일자 : " + txt6c);
			result = result + ("설립일자 : " + txt6c) + "<br />";
			
			var txt7a = txt6b.split("상장일자")[0];
			var txt7b = txt6b.split("상장일자")[1];
			var txt7c = txt7b.split("</strong>")[0].split("<strong>")[1];
			console.log("상장일자 : " + txt7c);
			result = result + ("상장일자 : " + txt7c) + "<br />";
			
			
			
			ppp(result, response)
			

		});
		
	});	
	
	
}).listen(8081);


console.log('Server running at http://127.0.0.1:8081/');
console.log();


function ppp(result, response) {
	response.writeHead(200, {'Content-Type': 'text/html'});
	response.write("<!DOCTYPE html><html  dir='ltr' xmlns='http://www.w3.org/1999/xhtml' lang='ko'><head><meta charset='utf-8'></head><body>");
	response.write(result);
	response.write("</body></html>");
	
	response.end();
}