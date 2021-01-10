import themer, { get } from '../index'

describe('get', () => {
  it('happy path objects', () => {
    let obj = {
      a: {
        b: {
          c: true,
        },
      },
    }
    expect(get(obj, 'a.b.c')).toBe(true)
  })
  it('sad path objects', () => {
    let obj = {
      a: {
        b: {
          c: true,
        },
      },
    }
    expect(get(obj, 'a.b.x')).toBe(undefined)
  })
  it('happy path arrays', () => {
    let obj = {
      a: {
        b: {
          c: [1, 2],
        },
      },
    }
    expect(get(obj, 'a.b.c.1')).toBe(2)
  })
  it('sad path arrays', () => {
    let obj = {
      a: {
        b: {
          c: [1, 2],
        },
      },
    }
    expect(get(obj, 'a.b.c.2')).toBe(undefined)
  })
})

describe('themer', () => {
  it('happy path', () => {
    let baseTheme = {
      colors: {
        white: '#fff',
        black: '#000',
        highContrast: '$black',
        lowContrast: '$white',
      },
    }

    expect(themer(baseTheme)).toEqual({
      colors: {
        white: '#fff',
        black: '#000',
        highContrast: '#000',
        lowContrast: '#fff',
      },
    })
  })
  it('a', () => {
    let baseTheme = {
      colors: {
        primary: 'mediumseagreen',
        white: '#fff',
        black: '#000',
      },
      computed: 'var(--foo, $colors.primary)',
    }

    expect(themer(baseTheme)).toEqual({
      colors: {
        primary: 'mediumseagreen',
        white: '#fff',
        black: '#000',
      },
      computed: 'var(--foo, mediumseagreen)',
    })
  })
  it('b', () => {
    let baseTheme = {
      colors: {
        primitives: {
          red: [0],
          green: [0],
          blue: [0],
          alpha: [0.95],
        },
        primary: 'mediumseagreen',
        white: '#fff',
        black: '#000',
      },
      computed:
        'rgba($colors.primitives.red.0, $colors.primitives.green.0, $colors.primitives.blue.0, $colors.primitives.alpha.0)',
    }

    expect(themer(baseTheme)).toEqual({
      colors: {
        primitives: {
          red: [0],
          green: [0],
          blue: [0],
          alpha: [0.95],
        },
        primary: 'mediumseagreen',
        white: '#fff',
        black: '#000',
      },
      computed: 'rgba(0, 0, 0, 0.95)',
    })
  })
  it('c', () => {
    let baseTheme = {
      colors: {
        green: ['mediumseagreen', 'lawngreen'],
        white: '#fff',
        black: '#000',
      },
      computed: '$colors.green.0',
    }

    expect(themer(baseTheme)).toEqual({
      colors: {
        green: ['mediumseagreen', 'lawngreen'],
        white: '#fff',
        black: '#000',
      },
      computed: 'mediumseagreen',
    })
  })
  it('d', () => {
    let baseTheme = {
      colors: {
        green: ['mediumseagreen', 'lawngreen'],
        white: '#fff',
        black: '#000',
      },
      space: [0, 4, 8, 12, 16, 20],
      computed: '$space.4',
    }

    expect(themer(baseTheme)).toEqual({
      colors: {
        green: ['mediumseagreen', 'lawngreen'],
        white: '#fff',
        black: '#000',
      },
      space: [0, 4, 8, 12, 16, 20],
      computed: '16',
    })
  })
})
