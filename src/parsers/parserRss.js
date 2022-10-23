const parserRSS = (response) => {
  try {
    const parser = new DOMParser();
    const data = parser.parseFromString(response.data.contents, 'text/xml');
    const feed = {
      title: data.querySelector('channel title').textContent,
      description: data.querySelector('channel description').textContent,
    };

    const topics = Array.from(data.querySelectorAll('item')).map((item) => {
      const top = {
        title: item.querySelector('title').textContent,
        link: item.querySelector('link').textContent,
        description: item.querySelector('description').textContent,
      };

      return top;
    });

    return { feed, topics };
  } catch {
    throw new Error('parsing error');
  }
};

export default parserRSS;
