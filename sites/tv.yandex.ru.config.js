module.exports = {
  lang: 'ru',
  site: 'tv.yandex.ru',
  channels: 'tv.yandex.ru.channels.xml',
  output: '.gh-pages/guides/tv.yandex.ru.xml',
  cookie:
    'yandexuid=8747786251615498142; Expires=Tue, 11 Mar 2031 21:29:02 GMT; Domain=yandex.ru; Path=/',
  url: function ({ date, channel }) {
    return `https://tv.yandex.ru/channel/${channel.site_id}?date=${date.format('YYYY-MM-DD')}`
  },
  parser: function ({ channel, content, lang }) {
    const initialState = content.match(/window.__INITIAL_STATE__ = (.*);/i)
    let programs = []
    if (!initialState && !initialState[1]) return programs

    const data = JSON.parse(initialState[1], null, 2)
    if (data.channel) {
      programs = data.channel.schedule.events.map(i => {
        return {
          title: i.title,
          description: i.program.description,
          start: i.start,
          stop: i.finish
        }
      })
    }

    return programs
  }
}
