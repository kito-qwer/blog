// ==UserScript==
// @name         AtCoder Best Moment
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  AtCoderで最高の瞬間のとき、ステータスを "AtCoder 最高の瞬間" にします。
// @author       Qvito
// @match        https://atcoder.jp/contests/*/submissions/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const tables = document.querySelectorAll('.table.table-bordered.table-striped.th-center');
    const resultTable = tables[2];
    var nonAcCount = 0;

    if (resultTable) {
        // テーブルのすべての行を取得
        const rows = resultTable.querySelectorAll('tbody tr');

        // 各テストケースの結果を取得
        const results = {};
        rows.forEach(row => {
            const caseNameElem = row.querySelector('td:nth-child(1)');
            const statusElem = row.querySelector('td:nth-child(2) span');
            const timeElem = row.querySelector('td:nth-child(3)');
            const memoryElem = row.querySelector('td:nth-child(4)');

            if (!caseNameElem || !statusElem || !timeElem || !memoryElem) {
                console.warn("一部の要素が見つかりませんでした:", row);
                return; // 次の行へ
            }

            const caseName = caseNameElem.textContent.trim();
            const status = statusElem.textContent.trim();
            const time = timeElem.textContent.trim();
            const memory = memoryElem.textContent.trim();

            if(status !== "AC"){
                nonAcCount++;
            }

            results[caseName] = { status, time, memory };
        });

        // console.log(results);
    } else {
        console.warn("テストケースの結果テーブルが見つかりません");
    }

    if(nonAcCount == 1){
        const judgeStatus = document.getElementById('judge-status');

        // ステータスの内容を変更
        if (judgeStatus) {
            // span の内容を変更
            const statusSpan = judgeStatus.querySelector('span');
            if (statusSpan) {
                statusSpan.textContent = 'AtCoder 最高の瞬間';
                // statusSpan.className = 'label label-best-moment';
                statusSpan.setAttribute('data-original-title', '不正解');
            }
        }
    }
})();
