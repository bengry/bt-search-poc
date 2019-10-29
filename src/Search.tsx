import React from 'react';
import { SearchInput } from './SearchInput';
import { data } from './data';
// import lucene from 'lucene';
import lucene from 'lucene-query-parser';
// import lucene from 'lucene-queryparser';
import luceneFilterFactory from 'lucene-filter';
// import ltr from 'lucene-to-regex';
import lunr from 'lunr';

const luceneFilter = luceneFilterFactory(lucene);

const documents = Array.from(data).map(([id, texts]) => ({
  id,
  text: texts.join(' '),
}));

interface Document {
  id: string;
  text: string;
}

/* const bigram: lunr.PipelineFunction = (token, index, tokens) => {
  return [token, new Token(' ', null), tokens[index + 1]];
}; */

const idx = lunr(builder => {
  builder.ref('id');
  builder.field('text');

  documents.forEach(doc => {
    builder.add(doc);
  });
});

export function Search() {
  const [term, setTerm] = React.useState(
    localStorage.getItem('savedQuery') || ''
  );

  /*  const regex = React.useMemo(() => {
    try {
      return ltr.toRegex(term);
    } catch {
      return 'regex parse error';
    }
  }, [term]); */

  React.useEffect(() => {
    localStorage.setItem('savedQuery', term);
  }, [term]);

  let values = {};
  try {
    if (term) {
      /* const ltrValue = dataValues.filter(item => regex.test(item.text));

      console.log('lucene ast', lucene.parse(term));
      // values['ltr'] = ltrValue;

      const luceneFilterValue = dataValues.filter(luceneFilter(term));
      values['luceneFilter'] = luceneFilterValue; */

      // console.log('lengths:', ltrValue.length, luceneFilterValue.length);

      // values = documents.filter(luceneFilter(term));

      /* const exactMatches = term.match(/".*"/gi);
      const manipulatedTerm = term.replace(/".*"/, '').trim(); */

      const x = lunr.tokenizer(term);
      console.log({ x });

      values = idx
        .query(qb => {
          qb.term(term, {
            wildcard: lunr.Query.wildcard.NONE,
          });
        })
        .map(result => data.get(result.ref).join(' '));
    }
  } catch (error) {
    console.error(error);
  }

  (window as any).debug_values = values;

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <SearchInput value={term} onChange={e => setTerm(e.target.value)} />
      {/* <DebugValue value={regex} /> */}
      <div
        style={{
          display: 'grid',
          gridAutoFlow: 'column',
          gridAutoColumns: '1fr',
        }}
      />
      <DebugValue value={!term ? documents : values ? values : ''} />
    </div>
  );
}

function DebugValue({ value }: { value: any }) {
  const length = Array.isArray(value) ? value.length : null;
  return (
    <div>
      {Array.isArray(value) && <span>length: {length}</span>}
      <pre style={{ alignSelf: 'flex-start' }}>
        {isObject(value) ? JSON.stringify(value, null, 2) : value.toString()}
      </pre>
    </div>
  );
}

function isObject(x: any) {
  return Array.isArray(x) || x.toString() === '[object Object]';
}
