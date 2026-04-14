import { useState } from "react";

const correctName = "진재혁";
const GAME_OVER_STACK = 7;

const questions = [
  {
    type: "choice",
    question: "다음 중 경례 구호는 무엇인가",
    choices: ["응가", "꺼추! 헤헤", "충성!", "움냥냥"],
    answer: "충성!",
    success: "그래 경례 구호는 충성이다. 앞으로 상급자를 보면 큰 소리로 경례할 수 있도록.",
    fail: "아이 새끼 기본이 안 돼 있구만",
  },
  {
    type: "choice",
    question: "군인은 제식을 지켜야 한다. 앞으로 갈 땐 어느 발이 먼저 나가야 하는가.",
    choices: ["왼발", "오른발", "오른손", "양발"],
    answer: "왼발",
    success: "제식 교육을 제대로 받았군.",
    fail: "제식 교육이 하나도 안 돼있네",
  },
  {
    type: "input",
    question:
      "다음 노래의 제목은? 밟아도 뿌리 뻗는 잔디풀처럼 시들어도 다시 피는 무궁화처럼 끈질기게 지켜온 아침의 나라 옛날 옛적 조상들은 큰 나라 세웠지 우리도 꿈을 키워 하나로 뭉쳐 힘 세고 튼튼한 나라 만드세",
    answer: ["아리랑 겨레", "아리랑겨레"],
    success: "좋다 훈련병. 사회에서 노래 좀 했나?",
    fail: "이썌끼가 군가도 못 외웠어?!",
  },
  {
    type: "input",
    question: "육군 복무신조.",
    answer: ["우리의 결의", "우리의결의"],
    success: "하하하 좋다, 훈련병. 자동반사로 나와야 된다.",
    fail: "훈련병. 네가 육군이라 할 수 있겠어?",
  },
  {
    type: "choice",
    question: "자 이 물건의 이름은 무엇인가.",
    image: "./k2.jpg",
    choices: ["K2", "SPORTAGE", "AK47", "내 고추"],
    answer: "K2",
    success: "정답이다. 앞으로 네가 쓸 총이지.",
    fail: "이것도 몰라? 넌 정체가 뭐야.",
  },
  {
    type: "input",
    question: "갑자기 쾅 소리와 함께 저의 전우들이 바닥에 엎드리며 뭐라 소리치고 있어요 ㅠㅠ 이거 무슨 상황인가요??",
    answer: ["적포탄낙하"],
    success: "정답. 너는 포탄이 낙하해도 살아남을 수 있겠군.",
    fail: "넌 이미 죽어있다.",
  },
  {
    type: "input",
    question: "훈련은 전투다!",
    answer: ["각개전투", "각!개!전!투!"],
    success: "정답. 무릎보호대 꼭 챙겨라...",
    fail: "훈련이 장난이야???????.",
  },
  {
    type: "input",
    question: "방독면은 몇 초 이내에 착용해야 하는가?",
    answer: ["9초", "9", "구초"],
    success: "정답. 본인은 훈련소 때 6초 만에 썼다.",
    fail: "뻐큐",
  },
  {
    type: "choice",
    question: "자, 이제 전입을 갔다 가정하고 질문하겠다.",
    choices: ["옙!", "시룬뎅..."],
    answer: "옙!",
    success: "",
    fail: "시발 뭐라고?",
  },
  {
    type: "input",
    question: "다음 용사들이 조작하고 있는 물건의 명칭은?",
    image: "./999k.jpg",
    answer: ["999K", "PRC-999K", "PRC999K"],
    success: "바로 그거지 존나 무거운 고철쓰레기",
    fail: "이걸 몰라?!",
  },
  {
    type: "choice",
    question: "이 물건의 이름은 무엇인가.",
    image: "./대검.jpg",
    choices: ["귀여운 곰돌이><", "코알라", "대검", "미도리야 이즈쿠"],
    answer: "대검",
    success: "정답이다. 대검의 밑부분이다.",
    fail: "아으으 어디서 이런 폐급이 기어들어왔어?!",
  },
  {
    type: "choice",
    question: "행정반에서 인원 한 명을 부른다. 누가 달려가야 할까?",
    choices: ["자고 있는 김병장", "앉아있는 내 동기 민철이", "어제 전입 온 너", "행정보급관"],
    answer: "어제 전입 온 너",
    success: "바로 그거다. 행정반에서 인원 부르면 냅다 달려가라\n\n...근데 민철이는 왜 안 뛰지?\n",
    fail: "하.. 이새끼이거 군기가 완전히 빠졌구만.",
  },
  {
    type: "choice",
    question: "선임이 아무런 이유 없이 널 갈군다. 어떻게 해야 할까?",
    choices: [
      "제가 뭘 잘못했다고 그러십니까?",
      "(고개 숙이고 좆잡고 반성하는 포즈로)죄송합니다...",
      "어이... 너무 강한 말은 하지 말라고... 약해 보이니까...",
      "(CQC로 제압한다.)",
    ],
    answer: "(고개 숙이고 좆잡고 반성하는 포즈로)죄송합니다...",
    success: "그렇지. 선임이 뭐라 하면 그냥 죄송하다고 해라.",
    fail: "이새끼 이거 딱 보니 하극상 한번 하겠네",
  },
  {
    type: "input",
    question: "네가 만약 상급자의 말을 이해하지 못했을 때 뭐라 해야 하는가",
    answer: ["잘못들었습니다", "잘못들었습니다?", "자몽소다", "자몽소다?"],
    success:
      "그래 그거야.",
    fail: "너는 선임 얘기에 집중 좀 해라.",
  },
  {
    type: "input",
    question: "K2의 탄약은 몇 구경인가?",
    answer: ["5.56", "5.56mm", "5.56미리", "5.56밀리미터", "5.56밀리"],
    success: "오 배틀그라운드 좀 했나봐?",
    fail: "너는 총 못 쏘겠다.",
  },
  {
    type: "choice",
    question: "기상 후 바로 해야 하는 행동은?",
    choices: [
      "침구류 정리",
      "시간 확인 후 10분만 더 자자 하며 잠들기",
      "모닝똥",
      "창문으로 뛰어 내리기",
    ],
    answer: "침구류 정리",
    success: "정답이다. 기상 후엔 반드시 침구류 정리를 해야 한다.",
    fail: "뭐하는 새끼야 이건.",
  },
  {
    type: "input",
    question: "매일 기상 후와 취침 전 하루 두 번 하는 군대의 행사는 무엇인가?",
    answer: ["점호"],
    success: "정답. 점호는 반드시 참여해야 한다.",
    fail: "이걸 몰라? 개빠졌구만.",
  },
  {
    type: "input",
    question: "아침점호 중 의미없이 몸을 흔들거리는 것을 뭐라 하는가.",
    answer: ["도수체조", "국군도수체조"],
    success: "정답. 이거 왜 하는 거냐 시원하지도 않은데.",
    fail: "ㅉ 기본이 안 돼있군.",
  },
  {
    type: "input",
    question: "일과가 끝나는 시간부터 다음날 아침까지 중대급 지휘관의 임무를 대리수행하는 간부를 뭐라 부르는가",
    answer: ["당직사관"],
    success: "정답. 당직은 굉장히 피곤하다.",
    fail: "아으으!!!!!",
  },
  {
    type: "input",
    question: "상관이 명령하면 하관은 복종한다.라는 의미를 가진 이 단어는?",
    answer: ["상명하복"],
    success: "그렇다. 필수지.",
    fail: "이거 완전 문제있는 놈이네.",
  },
  {
    type: "input",
    question: "육군 규정상 대대급에서 분기마다 1회씩 실시하며 계급 별로 요구되는 등급을 달성하지 못하면 진급누락이 되는 이것은?",
    answer: ["병기본", "병진급개인기본훈련평가", "병기본평가"],
    success: "정답. 정신전력 너무 어렵다.",
    fail: "넌 그냥 진누해라.",
  },
  {
    type: "choice",
    question: "진재혁이 개인정비 시간에 폰을 받으면 해야 되는 행동은?",
    choices: ["폰들고 얼른 3사로 들어가기.", "릴스 정독.", "서윤준한테 DM하기", "마음의 편지 작성"],
    answer: "서윤준한테 DM하기",
    success: "앙기모띠",
    fail: "쓰레기!",
  },
];

export default function Game() {
  const [started, setStarted] = useState(false);
  const [phase, setPhase] = useState("intro");
  // intro, askName, confirmedName, quiz, afterAnswer, end, gameOver

  const [dialogue, setDialogue] = useState("시작 버튼을 누르면 입소 절차를 진행한다.");
  const [input, setInput] = useState("");
  const [nameConfirmed, setNameConfirmed] = useState(false);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [warningStack, setWarningStack] = useState(0);
  const [score, setScore] = useState(0);

  function normalizeText(text) {
    return text.replace(/\s/g, "").toUpperCase();
  }

  function getAssistantMoodText(stack) {
    if (stack >= 6) return "너 지금 상황 파악이 안 되나?";
    if (stack >= 4) return "슬슬 인내심의 한계가 온다.";
    if (stack >= 2) return "집중 안 하나?";
    return "";
  }

  function getFailExtraText(stack) {
    if (stack >= 6) return "정신 안 차려? 마지막 기회다.";
    if (stack >= 4) return "분위기 파악 못 하나?";
    if (stack >= 2) return "긴장해라.";
    return "";
  }

  function resetGame() {
    setStarted(false);
    setPhase("intro");
    setDialogue("시작 버튼을 누르면 입소 절차를 진행한다.");
    setInput("");
    setNameConfirmed(false);
    setCurrentQuestion(0);
    setWarningStack(0);
    setScore(0);
  }

  function startGame() {
    setStarted(true);
    setPhase("askName");
    setDialogue("조교: 입소를 환영한다, 훈련병. 이름은?");
    setInput("");
    setNameConfirmed(false);
    setCurrentQuestion(0);
    setWarningStack(0);
    setScore(0);
  }

  function triggerGameOver(message) {
    setDialogue(message);
    setPhase("gameOver");
    setInput("");
  }

  function handleNameSubmit() {
    const trimmed = normalizeText(input);

    if (!trimmed) {
      setDialogue("조교: 아무것도 입력 안 할 건가? 이름을 똑바로 입력해라.");
      return;
    }

    if (trimmed === correctName) {
      setNameConfirmed(true);
      setPhase("confirmedName");
      setDialogue(`조교: 그래, ${correctName} 훈련병. 환영한다.\n준비가 됐으면 다음을 눌러라.`);
      setInput("");
      return;
    }

    const newStack = warningStack + 1;
    setWarningStack(newStack);

    if (newStack >= GAME_OVER_STACK) {
      triggerGameOver(
        `조교: 이름도 제대로 못 말하나?\n훈련 받을 자격이 없다.\n즉시 퇴소다.\n\nGAME OVER`
      );
      return;
    }

    setDialogue(
      `조교: 네 이름이 ${trimmed} 맞아??!!?!\n정신 안 차려???!?!?!. 다시 입력해라.\n${getAssistantMoodText(newStack)}`
    );
    setInput("");
  }

  function handleQuizAnswer(answerText) {
    const current = questions[currentQuestion];
    const userAnswer = answerText.trim();

    if (!userAnswer) {
      setDialogue("조교: 대답을 안 할 셈인가? 다시 입력해라.");
      return;
    }

    const correctAnswer = current.answer;
    const normalizedUserAnswer = normalizeText(userAnswer);

    const isCorrect = Array.isArray(correctAnswer)
      ? correctAnswer.map((a) => normalizeText(a)).includes(normalizedUserAnswer)
      : normalizedUserAnswer === normalizeText(correctAnswer);

    const isLastQuestion = currentQuestion === questions.length - 1;

    if (isCorrect) {
      const newScore = score + 1;
      setScore(newScore);

      if (isLastQuestion) {
        setDialogue(`조교: ${current.success}\n모든 훈련이 끝났다.\n수료를 축하한다.`);
        setPhase("end");
      } else {
        setDialogue(`조교: ${current.success}\n다음 문제로 넘어간다.`);
        setPhase("afterAnswer");
      }

      setInput("");
      return;
    }

    const newStack = warningStack + 1;
    setWarningStack(newStack);

    if (newStack >= GAME_OVER_STACK) {
      triggerGameOver(
        `조교: 정신상태 불량!!!!!!!.\n경고를 너무 많이 받았다.\n전시였으면 넌 즉결처형이다.\n\nGAME OVER`
      );
      return;
    }

    if (isLastQuestion) {
      setDialogue(
        `조교: ${current.fail}\n${getFailExtraText(newStack)}\n현재 경고 스택: ${newStack}\n\n모든 훈련이 끝났다.`
      );
      setPhase("end");
    } else {
      setDialogue(
        `조교: ${current.fail}\n${getFailExtraText(newStack)}\n현재 경고 스택: ${newStack}\n다음 문제로 넘어간다.`
      );
      setPhase("afterAnswer");
    }

    setInput("");
  }

  function handleSubmit() {
    if (phase === "askName") {
      handleNameSubmit();
      return;
    }

    if (phase === "quiz") {
      handleQuizAnswer(input);
    }
  }

  function handleChoiceClick(choice) {
    if (phase !== "quiz") return;
    handleQuizAnswer(choice);
  }

  function handleNext() {
    if (phase === "gameOver") {
      resetGame();
      return;
    }

    if (phase === "confirmedName") {
      setCurrentQuestion(0);
      setPhase("quiz");
      setDialogue(`조교: 첫 번째 문제다.\n${questions[0].question}`);
      return;
    }

    if (phase === "afterAnswer") {
      const nextIndex = currentQuestion + 1;
      setCurrentQuestion(nextIndex);
      setPhase("quiz");
      setDialogue(`조교: 다음 문제다.\n${questions[nextIndex].question}`);
      return;
    }

    if (phase === "end") {
      resetGame();
    }
  }

  const safeQuestion =
    currentQuestion >= 0 && currentQuestion < questions.length
      ? questions[currentQuestion]
      : null;

  return (
    <div style={styles.wrapper}>
      <div style={styles.gameBox}>
        <h1 style={styles.title}>훈련소 시뮬레이터</h1>

        <div style={styles.statusRow}>
          <div style={styles.statusBox}>경고: {warningStack}</div>
          <div style={styles.statusBox}>
            정답: {score}
          </div>
          <div style={styles.statusBox}>진행 상태: {started ? phase : "대기 중"}</div>
        </div>

        <div style={styles.dialogueBox}>
          <p style={styles.dialogueText}>
            {dialogue.split("\n").map((line, index) => (
              <span key={index}>
                {line}
                <br />
              </span>
            ))}
          </p>
        </div>

        {started && phase === "quiz" && safeQuestion && (
          <div
            style={{
              backgroundColor: "#020405",
              padding: "15px",
              borderRadius: "10px",
              marginBottom: "15px",
              fontSize: "18px",
              border: "2px solid #dacccc",
            }}
          >
            <div style={{ marginBottom: safeQuestion.image ? "10px" : "0" }}>
              {safeQuestion.question}
            </div>

            {safeQuestion.image && (
              <img
                src={safeQuestion.image}
                alt="문제 이미지"
                style={{
                  width: "100%",
                  maxHeight: "250px",
                  objectFit: "contain",
                  borderRadius: "8px",
                  display: "block",
                }}
              />
            )}
          </div>
        )}

        {!started && (
          <button style={styles.mainButton} onClick={startGame}>
            시작
          </button>
        )}

        {started && phase === "askName" && (
          <div style={styles.inputArea}>
            <input
              style={styles.input}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="이름 입력"
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSubmit();
              }}
            />
            <button style={styles.mainButton} onClick={handleSubmit}>
              입력
            </button>
          </div>
        )}

        {started && phase === "quiz" && safeQuestion && safeQuestion.type === "input" && (
          <div style={styles.inputArea}>
            <input
              style={styles.input}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="답 입력"
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSubmit();
              }}
            />
            <button style={styles.mainButton} onClick={handleSubmit}>
              입력
            </button>
          </div>
        )}

        {started && phase === "quiz" && safeQuestion && safeQuestion.type === "choice" && (
          <div style={styles.choiceArea}>
            {safeQuestion.choices.map((choice) => (
              <button
                key={choice}
                style={styles.choiceButton}
                onClick={() => handleChoiceClick(choice)}
              >
                {choice}
              </button>
            ))}
          </div>
        )}

        {started &&
          (phase === "confirmedName" ||
            phase === "afterAnswer" ||
            phase === "end" ||
            phase === "gameOver") && (
            <button style={styles.mainButton} onClick={handleNext}>
              {phase === "end" ? "다시 시작" : phase === "gameOver" ? "처음부터 다시" : "다음"}
            </button>
          )}

        {nameConfirmed && phase !== "intro" && (
          <p style={styles.nameText}>등록된 훈련병: {correctName}</p>
        )}
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    minHeight: "100vh",
    backgroundColor: "#000000",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    boxSizing: "border-box",
  },
  gameBox: {
    width: "100%",
    maxWidth: "760px",
    backgroundColor: "#289c3b",
    border: "3px solid #dbdbdb",
    borderRadius: "16px",
    padding: "24px",
    boxSizing: "border-box",
    color: "white",
    fontFamily: "sans-serif",
  },
  title: {
    textAlign: "center",
    marginTop: 0,
    marginBottom: "20px",
  },
  statusRow: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
    marginBottom: "16px",
  },
  statusBox: {
    flex: 1,
    minWidth: "140px",
    backgroundColor: "#000000",
    padding: "10px",
    borderRadius: "10px",
    textAlign: "center",
    fontSize: "14px",
  },
  dialogueBox: {
    minHeight: "200px",
    backgroundColor: "#9b643f",
    border: "2px solid #000000",
    borderRadius: "12px",
    padding: "16px",
    marginBottom: "16px",
  },
  dialogueText: {
    margin: 0,
    lineHeight: "1.7",
    fontSize: "18px",
  },
  inputArea: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
  },
  input: {
    flex: 1,
    minWidth: "220px",
    padding: "12px",
    fontSize: "16px",
    borderRadius: "10px",
    border: "none",
    outline: "none",
  },
  mainButton: {
    padding: "12px 18px",
    fontSize: "16px",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    backgroundColor: "#443632",
    color: "white",
  },
  choiceArea: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "10px",
  },
  choiceButton: {
    padding: "14px",
    fontSize: "16px",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
    backgroundColor: "#473512",
    color: "white",
  },
  nameText: {
    marginTop: "14px",
    fontSize: "14px",
    color: "#070202",
  },
};