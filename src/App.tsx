import { useTimer } from './hooks/useTimer'
import { TimerMode } from './types/timer'

function App() {
  const {
    mode,
    timeLeft,
    isRunning,
    completedPomodoros,
    startTimer,
    pauseTimer,
    skipTimer,
    resetTimer,
    switchMode,
    formatTime,
  } = useTimer()

  const getModeInfo = (currentMode: TimerMode) => {
    switch (currentMode) {
      case 'work':
        return {
          title: '작업 시간',
          color: 'from-red-500 to-pink-600',
          buttonColor: 'bg-red-500 hover:bg-red-600',
          icon: '🍅'
        }
      case 'shortBreak':
        return {
          title: '짧은 휴식',
          color: 'from-green-500 to-emerald-600',
          buttonColor: 'bg-green-500 hover:bg-green-600',
          icon: '☕'
        }
      case 'longBreak':
        return {
          title: '긴 휴식',
          color: 'from-blue-500 to-indigo-600',
          buttonColor: 'bg-blue-500 hover:bg-blue-600',
          icon: '🌴'
        }
    }
  }

  const currentModeInfo = getModeInfo(mode)

  return (
    <div className={`min-h-screen bg-gradient-to-br ${currentModeInfo.color} flex items-center justify-center transition-all duration-1000`}>
      <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 max-w-md w-full mx-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">{currentModeInfo.icon}</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            포모도로 타이머
          </h1>
          <p className="text-gray-600">
            {currentModeInfo.title}
          </p>
        </div>

        {/* Mode Selector */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-100 rounded-full p-1 flex">
            {(['work', 'shortBreak', 'longBreak'] as TimerMode[]).map((modeOption) => (
              <button
                key={modeOption}
                onClick={() => switchMode(modeOption)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  mode === modeOption
                    ? 'bg-white shadow-md text-gray-800'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                {modeOption === 'work' ? '작업' : modeOption === 'shortBreak' ? '짧은 휴식' : '긴 휴식'}
              </button>
            ))}
          </div>
        </div>

        {/* Timer Display */}
        <div className="text-center mb-8">
          <div className="text-8xl font-mono font-bold text-gray-800 mb-4">
            {formatTime(timeLeft)}
          </div>
          <div className="text-sm text-gray-600">
            완료된 포모도로: {completedPomodoros}개
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex justify-center gap-3 mb-6 flex-wrap">
          <button
            onClick={isRunning ? pauseTimer : startTimer}
            className={`${currentModeInfo.buttonColor} text-white font-semibold py-3 px-6 rounded-full transition-all duration-200 transform hover:scale-105 shadow-lg text-sm whitespace-nowrap min-w-[120px]`}
          >
            {isRunning ? '⏸️ 일시정지' : '▶️ 시작'}
          </button>
          
          <button
            onClick={resetTimer}
            className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-full transition-all duration-200 transform hover:scale-105 shadow-lg text-sm whitespace-nowrap min-w-[100px]"
          >
            🔄 리셋
          </button>
          
          <button
            onClick={skipTimer}
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-full transition-all duration-200 transform hover:scale-105 shadow-lg text-sm whitespace-nowrap min-w-[100px]"
          >
            ⏭️ 넘기기
          </button>
        </div>

        {/* Progress Indicator */}
        <div className="mb-6">
          <div className="flex justify-between text-xs text-gray-600 mb-2">
            <span>진행률</span>
            <span>
              {mode === 'work' ? 25 - Math.floor(timeLeft / 60) : 
               mode === 'shortBreak' ? 5 - Math.floor(timeLeft / 60) : 
               30 - Math.floor(timeLeft / 60)} / {
               mode === 'work' ? 25 : mode === 'shortBreak' ? 5 : 30
              }분
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-1000 ${
                mode === 'work' ? 'bg-red-500' : 
                mode === 'shortBreak' ? 'bg-green-500' : 'bg-blue-500'
              }`}
              style={{
                width: `${((mode === 'work' ? 1500 : mode === 'shortBreak' ? 300 : 1800) - timeLeft) / 
                        (mode === 'work' ? 1500 : mode === 'shortBreak' ? 300 : 1800) * 100}%`
              }}
            />
          </div>
        </div>

        {/* Pomodoro Counter */}
        <div className="text-center">
          <div className="flex justify-center gap-2">
            {Array.from({ length: 4 }, (_, i) => (
              <div
                key={i}
                className={`w-4 h-4 rounded-full ${
                  i < completedPomodoros % 4 ? 'bg-red-500' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
          <p className="text-xs text-gray-600 mt-2">
            다음 긴 휴식까지 {4 - (completedPomodoros % 4)}개 남음
          </p>
        </div>
      </div>
    </div>
  )
}

export default App