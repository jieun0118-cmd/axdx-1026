import { useState, useEffect } from 'react'
import './App.css'

const STYLES = ['캐주얼', '스트릿', '포멀', '미니멀', '스포티', '아메카지', '워크웨어']

interface OutfitItem {
  title: string
  image: string
  link: string
  lprice: string
}

interface OutfitSet {
  top: OutfitItem[]
  bottom: OutfitItem[]
  shoes: OutfitItem[]
  bag: OutfitItem[]
  hat: OutfitItem[]
  accessory: OutfitItem[]
}

interface SavedOutfit {
  id: number
  date: string
  bodyType: string
  style: string
  items: OutfitItem[]
}

const getBodyType = (height: number, weight: number): string => {
  const bmi = weight / ((height / 100) ** 2)
  if (bmi < 18.5) return '슬림'
  if (bmi < 23) return '보통'
  if (bmi < 27) return '탄탄'
  return '빅사이즈'
}

const getKeywords = (style: string, bodyType: string) => {
  const map: Record<string, Record<string, any>> = {
    캐주얼: {
      슬림: { top: '슬림핏 스트라이프 셔츠', bottom: '슬림 치노 팬츠', shoes: '흰 스니커즈', bag: '미니 크로스백', hat: '버킷햇', accessory: '실버 팔찌' },
      보통: { top: '오버핏 베이직 티셔츠', bottom: '와이드 데님', shoes: '흰 운동화', bag: '캐주얼 토트백', hat: '볼캡', accessory: '심플 목걸이' },
      탄탄: { top: '루즈핏 린넨 셔츠', bottom: '릴렉스 치노 팬츠', shoes: '로퍼', bag: '캔버스 백팩', hat: '버킷햇', accessory: '레더 팔찌' },
      빅사이즈: { top: '빅사이즈 오버핏 티셔츠', bottom: '빅사이즈 와이드 팬츠', shoes: '쿠션 운동화', bag: '크로스백', hat: '볼캡', accessory: '심플 목걸이' },
    },
    스트릿: {
      슬림: { top: '슬림 그래픽 티셔츠', bottom: '슬림 조거 팬츠', shoes: '하이탑 스니커즈', bag: '스트릿 힙색', hat: '스냅백', accessory: '체인 목걸이' },
      보통: { top: '오버핏 후드티', bottom: '카고 팬츠', shoes: '덩크 스니커즈', bag: '스트릿 백팩', hat: '스냅백', accessory: '체인 목걸이' },
      탄탄: { top: '루즈핏 그래픽 티셔츠', bottom: '와이드 카고 팬츠', shoes: '조던 스니커즈', bag: '힙색', hat: '버킷햇', accessory: '실버 링' },
      빅사이즈: { top: '빅사이즈 후드티', bottom: '빅사이즈 카고 팬츠', shoes: '맥스 쿠션 스니커즈', bag: '백팩', hat: '스냅백', accessory: '체인 목걸이' },
    },
    포멀: {
      슬림: { top: '슬림핏 화이트 드레스셔츠', bottom: '슬림 슬랙스', shoes: '더비 구두', bag: '서류 가방', hat: '페도라', accessory: '실버 시계' },
      보통: { top: '레귤러핏 옥스포드 셔츠', bottom: '레귤러 슬랙스', shoes: '로퍼 구두', bag: '브리프케이스', hat: '페도라', accessory: '가죽 시계' },
      탄탄: { top: '루즈핏 리넨 셔츠', bottom: '와이드 슬랙스', shoes: '첼시 부츠', bag: '토트백', hat: '페도라', accessory: '골드 시계' },
      빅사이즈: { top: '빅사이즈 드레스셔츠', bottom: '빅사이즈 슬랙스', shoes: '컴포트 로퍼', bag: '서류 가방', hat: '페도라', accessory: '가죽 시계' },
    },
    미니멀: {
      슬림: { top: '슬림 화이트 티셔츠', bottom: '블랙 슬림 팬츠', shoes: '화이트 미니멀 스니커즈', bag: '미니멀 클러치', hat: '베이지 버킷햇', accessory: '심플 실버 반지' },
      보통: { top: '오버핏 그레이 티셔츠', bottom: '블랙 와이드 팬츠', shoes: '화이트 스니커즈', bag: '미니멀 토트백', hat: '베이지 볼캡', accessory: '심플 목걸이' },
      탄탄: { top: '루즈핏 베이지 티셔츠', bottom: '오트밀 와이드 팬츠', shoes: '베이지 스니커즈', bag: '캔버스 토트백', hat: '크림 버킷햇', accessory: '우드 팔찌' },
      빅사이즈: { top: '빅사이즈 블랙 티셔츠', bottom: '빅사이즈 와이드 팬츠', shoes: '블랙 스니커즈', bag: '미니멀 백팩', hat: '블랙 볼캡', accessory: '심플 목걸이' },
    },
    스포티: {
      슬림: { top: '슬림 스포츠 티셔츠', bottom: '슬림 트레이닝 팬츠', shoes: '러닝화', bag: '스포츠 힙색', hat: '스포츠 볼캡', accessory: '스포츠 밴드' },
      보통: { top: '오버핏 스포츠 후드', bottom: '조거 팬츠', shoes: '트레이닝화', bag: '스포츠 백팩', hat: '스포츠 캡', accessory: '스마트워치' },
      탄탄: { top: '머슬핏 스포츠 티셔츠', bottom: '테이퍼드 트레이닝 팬츠', shoes: '트레이닝화', bag: '짐백', hat: '스포츠 밴드', accessory: '스마트워치' },
      빅사이즈: { top: '빅사이즈 스포츠 티셔츠', bottom: '빅사이즈 조거 팬츠', shoes: '와이드 쿠션 운동화', bag: '스포츠 백팩', hat: '스포츠 캡', accessory: '스포츠 밴드' },
    },
    아메카지: {
      슬림: { top: '슬림 체크 플란넬 셔츠', bottom: '슬림 워크 팬츠', shoes: '부츠', bag: '캔버스 토트백', hat: '워크캡', accessory: '레더 팔찌' },
      보통: { top: '오버핏 데님 셔츠', bottom: '워크 팬츠', shoes: '워크 부츠', bag: '캔버스 백팩', hat: '워크캡', accessory: '도그태그' },
      탄탄: { top: '루즈핏 플란넬 셔츠', bottom: '와이드 워크 팬츠', shoes: '레더 부츠', bag: '밀리터리 백팩', hat: '버킷햇', accessory: '레더 팔찌' },
      빅사이즈: { top: '빅사이즈 플란넬 셔츠', bottom: '빅사이즈 워크 팬츠', shoes: '컴포트 부츠', bag: '캔버스 토트백', hat: '워크캡', accessory: '도그태그' },
    },
    워크웨어: {
      슬림: { top: '슬림 워크 재킷', bottom: '슬림 카고 팬츠', shoes: '워크 부츠', bag: '유틸리티 파우치', hat: '워커 캡', accessory: '도그태그' },
      보통: { top: '오버핏 워크 재킷', bottom: '카고 팬츠', shoes: '헤비 워크 부츠', bag: '밀리터리 백팩', hat: '워커 캡', accessory: '밀리터리 시계' },
      탄탄: { top: '루즈핏 워크 셔츠', bottom: '더블니 카고 팬츠', shoes: '레더 워크 부츠', bag: '유틸리티 백팩', hat: '버킷햇', accessory: '헤비 체인' },
      빅사이즈: { top: '빅사이즈 워크 재킷', bottom: '빅사이즈 카고 팬츠', shoes: '와이드 워크 부츠', bag: '밀리터리 백팩', hat: '워커 캡', accessory: '도그태그' },
    },
  }
  return map[style]?.[bodyType] || map['캐주얼']['보통']
}

const fetchNaverItems = async (query: string, start = 1): Promise<OutfitItem[]> => {
  const res = await fetch(
    `/api/naver/v1/search/shop.json?query=남성+${query}&display=3&start=${start}&sort=sim`
  )
  const data = await res.json()
  return data.items || []
}

type CategoryKey = keyof OutfitSet

function App() {
  const [page, setPage] = useState<'home' | 'saved'>('home')
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  const [selectedStyle, setSelectedStyle] = useState('')
  const [includeExtras, setIncludeExtras] = useState({
    shoes: true, bag: false, hat: false, accessory: false,
  })
  const [results, setResults] = useState<OutfitSet | null>(null)
  const [loading, setLoading] = useState(false)
  const [bodyType, setBodyType] = useState('')
  const [keywords, setKeywords] = useState<any>(null)
  const [pinned, setPinned] = useState<Record<string, OutfitItem>>({})
  const [savedOutfits, setSavedOutfits] = useState<SavedOutfit[]>(() => {
    const stored = localStorage.getItem('savedOutfits')
    return stored ? JSON.parse(stored) : []
  })

  useEffect(() => {
    localStorage.setItem('savedOutfits', JSON.stringify(savedOutfits))
  }, [savedOutfits])

  const randomStart = () => Math.floor(Math.random() * 20) + 1

  const search = async (isRefresh = false, extrasOverride?: typeof includeExtras) => {
    if (!height || !weight) return alert('키와 몸무게를 입력해주세요!')
    if (!selectedStyle) return alert('스타일을 선택해주세요!')
    setLoading(true)
    const extras = extrasOverride || includeExtras
    try {
      const bt = isRefresh ? bodyType : getBodyType(Number(height), Number(weight))
      const kw = isRefresh ? keywords : getKeywords(selectedStyle, bt)
      if (!isRefresh) {
        setBodyType(bt)
        setKeywords(kw)
      }

      const categories: CategoryKey[] = ['top', 'bottom', 'shoes', 'bag', 'hat', 'accessory']
      const newResults: any = { ...(results || {}) }

      await Promise.all(
        categories.map(async (cat) => {
          if (cat === 'shoes' && !extras.shoes) { newResults[cat] = []; return }
          if (cat === 'bag' && !extras.bag) { newResults[cat] = []; return }
          if (cat === 'hat' && !extras.hat) { newResults[cat] = []; return }
          if (cat === 'accessory' && !extras.accessory) { newResults[cat] = []; return }

          const pinnedItems = (results?.[cat] || []).filter(
            (item) => Object.values(pinned).some((p) => p.link === item.link)
          )
          const needCount = 3 - pinnedItems.length
          const items = await fetchNaverItems(kw[cat], randomStart())
          const unpinnedNew = items
            .filter((item) => !Object.values(pinned).some((p) => p.link === item.link))
            .slice(0, needCount)
          newResults[cat] = [...pinnedItems, ...unpinnedNew]
        })
      )

      setResults(newResults)
    } catch (e) {
      alert('오류가 발생했어요. 다시 시도해주세요.')
    }
    setLoading(false)
  }

  const toggleExtra = (key: keyof typeof includeExtras) => {
    const newExtras = { ...includeExtras, [key]: !includeExtras[key] }
    setIncludeExtras(newExtras)
    if (results) search(true, newExtras)
  }

  const togglePin = (cat: CategoryKey, item: OutfitItem) => {
    setPinned((prev) => {
      const next = { ...prev }
      if (next[item.link]) delete next[item.link]
      else next[item.link] = item
      return next
    })
  }

  const saveOutfit = () => {
    const pinnedList = Object.values(pinned)
    if (pinnedList.length === 0) return alert('📌 먼저 마음에 드는 상품을 고정해주세요!')
    const newOutfit: SavedOutfit = {
      id: Date.now(),
      date: new Date().toLocaleDateString('ko-KR'),
      bodyType,
      style: selectedStyle,
      items: pinnedList,
    }
    setSavedOutfits((prev) => [newOutfit, ...prev])
    alert('💾 저장됐어요!')
  }

  const deleteOutfit = (id: number) => {
    setSavedOutfits((prev) => prev.filter((o) => o.id !== id))
  }

  const loadOutfit = (outfit: SavedOutfit) => {
    setSelectedStyle(outfit.style)
    setBodyType(outfit.bodyType)
    const kw = getKeywords(outfit.style, outfit.bodyType)
    setKeywords(kw)
    const newPinned: Record<string, OutfitItem> = {}
    outfit.items.forEach((item) => { newPinned[item.link] = item })
    setPinned(newPinned)
    setPage('home')
    setTimeout(() => search(true), 100)
  }

  const renderSection = (title: string, cat: CategoryKey, keyword: string) => {
    const items = results?.[cat] || []
    if (items.length === 0) return null
    return (
      <div className="section">
        <h2>{title} <span className="keyword">"{keyword}"</span></h2>
        <div className="results">
          {items.map((item, i) => {
            const isPinned = !!pinned[item.link]
            return (
              <a key={i} href={item.link} target="_blank" rel="noreferrer"
                className={`card ${isPinned ? 'pinned' : ''}`}>
                <button
                  className={`pin-btn ${isPinned ? 'active' : ''}`}
                  onClick={(e) => { e.preventDefault(); togglePin(cat, item) }}
                >
                  📌
                </button>
                <img src={item.image} alt={item.title} />
                <p className="item-title" dangerouslySetInnerHTML={{ __html: item.title }} />
                <p className="price">{Number(item.lprice).toLocaleString()}원</p>
              </a>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <nav className="nav">
        <button className={`nav-btn ${page === 'home' ? 'active' : ''}`} onClick={() => setPage('home')}>
          👕 코디 추천
        </button>
        <button className={`nav-btn ${page === 'saved' ? 'active' : ''}`} onClick={() => setPage('saved')}>
          💾 저장된 코디 {savedOutfits.length > 0 && <span className="badge">{savedOutfits.length}</span>}
        </button>
      </nav>

      {page === 'home' && (
        <>
          <h1>👕 AI 남성 패션 코디 추천</h1>
          <div className="form">
            <label>키 (cm)</label>
            <input type="number" value={height}
              onChange={(e) => setHeight(e.target.value)} placeholder="예: 175" />
            <label>몸무게 (kg)</label>
            <input type="number" value={weight}
              onChange={(e) => setWeight(e.target.value)} placeholder="예: 70" />
            <label>스타일 선택</label>
            <div className="tags">
              {STYLES.map((s) => (
                <button key={s}
                  className={`tag ${selectedStyle === s ? 'active' : ''}`}
                  onClick={() => setSelectedStyle(s)}>
                  {s}
                </button>
              ))}
            </div>
            <label>잡화 선택 (선택사항)</label>
            <div className="tags">
              {(['shoes', 'bag', 'hat', 'accessory'] as const).map((key) => (
                <button key={key}
                  className={`tag ${includeExtras[key] ? 'active' : ''}`}
                  onClick={() => results ? toggleExtra(key) : setIncludeExtras((prev) => ({ ...prev, [key]: !prev[key] }))}>
                  {key === 'shoes' ? '👟 신발' : key === 'bag' ? '👜 가방' : key === 'hat' ? '🧢 모자' : '💍 악세서리'}
                </button>
              ))}
            </div>
            <button className="search-btn" onClick={() => { setPinned({}); search(false) }} disabled={loading}>
              {loading ? '코디 찾는 중...' : '✨ AI 코디 추천받기'}
            </button>
          </div>

          {loading && (
            <div className="loading-box">
              <p>🤖 체형에 맞는 코디를 분석 중이에요...</p>
            </div>
          )}

          {results && keywords && (
            <>
              <div className="body-type-badge">
                체형 분석 결과: <strong>{bodyType}</strong> 체형
              </div>
              <p className="pin-guide">📌 마음에 드는 상품을 고정하고 다른 코디를 둘러보세요!</p>
              <div className="outfit">
                {renderSection('👕 상의', 'top', keywords.top)}
                {renderSection('👖 하의', 'bottom', keywords.bottom)}
                {includeExtras.shoes && renderSection('👟 신발', 'shoes', keywords.shoes)}
                {includeExtras.bag && renderSection('👜 가방', 'bag', keywords.bag)}
                {includeExtras.hat && renderSection('🧢 모자', 'hat', keywords.hat)}
                {includeExtras.accessory && renderSection('💍 악세서리', 'accessory', keywords.accessory)}
              </div>
              <div className="action-btns">
                <button className="refresh-btn" onClick={() => search(true)} disabled={loading}>
                  🔄 다른 코디 보기
                </button>
                <button className="save-btn" onClick={saveOutfit}>
                  💾 고정 상품 저장
                </button>
              </div>
            </>
          )}
        </>
      )}

      {page === 'saved' && (
        <>
          <h1>💾 저장된 코디</h1>
          {savedOutfits.length === 0 ? (
            <div className="empty">
              <p>저장된 코디가 없어요!</p>
              <p>마음에 드는 상품을 📌 고정하고 저장해보세요.</p>
            </div>
          ) : (
            <div className="saved-list">
              {savedOutfits.map((outfit) => (
                <div key={outfit.id} className="saved-card">
                  <div className="saved-header">
                    <span>{outfit.date} · {outfit.style} · {outfit.bodyType} 체형</span>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button className="load-btn" onClick={() => loadOutfit(outfit)}>
                        🔄 이 코디 기반으로 더 보기
                      </button>
                      <button className="delete-btn" onClick={() => deleteOutfit(outfit.id)}>🗑️</button>
                    </div>
                  </div>
                  <div className="saved-items">
                    {outfit.items.map((item, i) => (
                      <a key={i} href={item.link} target="_blank" rel="noreferrer" className="saved-item">
                        <img src={item.image} alt={item.title} />
                        <p className="item-title" dangerouslySetInnerHTML={{ __html: item.title }} />
                        <p className="price">{Number(item.lprice).toLocaleString()}원</p>
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default App