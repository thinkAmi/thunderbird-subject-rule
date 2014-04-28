function addonCommand(event) {
    var msgSubject = document.getElementById("msgSubject");

    var subject = trimSubject(msgSubject.value);
    msgSubject.value = editSubject(subject);

    // ラベルを使う場合には、以下のように記載する
    //msgSubject.value = event.label + "：" + msgSubject.value;
    msgSubject.focus();

    // メール作成画面に、件名が変更されたことを通知する
    gContentChanged=true;
    SetComposeWindowTitle();
}


// Subjectから不要な文字列を削除する
function trimSubject(subject){
    if (subject.substr(0,4) == "Re: ") {
        return subject.substr(4);
    }

    return subject;
}


// Subjectを編集する
function editSubject(subject){

    var date = new Date();
    var yy = String(date.getFullYear()).substr(2,2);
    var mail_subject_rule = yy + padZero((date.getMonth()+1)) + padZero(date.getDate()) + "_";


    // 新規作成
    if (subject == "") {
        return mail_subject_rule;
    }

    // すでにルールが適用されているSubject
    oldPart = subject.substr(0,7);
    if (oldPart.match(new RegExp("[0-9]{6}_", "i"))) {
        return mail_subject_rule + subject.substr(7);
    }

    // 上記以外の場合は、適用する
    return mail_subject_rule + subject;
}



// targetが一桁の場合、先頭にゼロを一つパディングする
function padZero(target){
    if(target < 10){
        return "0" + target;
    }
    else{
        return "" + target;
    }
}