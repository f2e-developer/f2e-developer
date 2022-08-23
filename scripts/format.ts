import 'zx/globals';

(async () => {
  const filePath = path.join(__dirname, '../README.md');
  const content = fs.readFileSync(filePath, 'utf-8').split('\n');
  let start = 0;
  let end = 0;
  content.forEach((line, index) => {
    if (line.startsWith('> Sorted in alphabetical order.')) start = index + 2;
    if (line.startsWith('## Reference')) end = index - 1;
  });
  const list = content.slice(start, end);
  // compare by key
  list.sort((a, b) => {
    return getKey(a) > getKey(b) ? 1 : -1;
  });
  // console.log(list.join('\n'));
  const newContent = [
    ...content.slice(0, start),
    ...list,
    ...content.slice(end),
  ];
  fs.writeFileSync(filePath, newContent.join('\n'), 'utf-8');
})();


function getKey(line: string) {
  return getName(line);
}

function getName(line: string) {
  return line.match(/\[(.+?)]/)![1];
}
