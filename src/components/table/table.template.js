const CODES = {
  A: 65,
  Z: 90,
};

function toCell(row) {
  return function(_, col) {
    return `<div class="cell" 
              data-col="${col}" 
              data-row="${row}"
              data-id="${row}:${col}" 
              data-cell="cell"
              contenteditable>
            </div>`;
  };
}
function toColumn(col, index) {
  return `<div class="column" data-type="resizable" data-col="${index}">
      ${col}
    <div class="col-resize" data-resize="col">    
    <div class="col-resize-line"></div>
    </div>
  </div>`;
}

function toRow(content, index) {
  const resizer = index
    ? `<div class="row-resize" data-resize="row">
        <div class="row-resize-line">
      </div></div>`
    : "";

  return `<div class="row" data-type="resizable">
  <div class="row-info">${index || ""}
    ${resizer}
  </div>
  <div class="row-data">${content}</div>
  </div>`;
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index);
}

export function createTable(rowsCount = 15) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];

  const cols = new Array(colsCount).fill("").map(toChar).map(toColumn).join("");

  rows.push(toRow(cols));

  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount)
      .fill("")
      .map(toCell(row))
      .join("");

    rows.push(toRow(cells, row + 1));
  }

  return rows.join("");
}