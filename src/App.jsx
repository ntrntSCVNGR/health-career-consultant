import React, { useState, useMemo } from 'react';

// Central data object to hold all career path details
// We've expanded this with new careers based on our discussions!
const careerData = {
  'public-health': {
    title: 'The Public Health Specialist!',
    description: 'This career is the perfect blend of all your passions, my love! It allows you to be a storyteller, working directly in the community to make a massive impact, all while using your brilliant analytical mind to solve important puzzles. It\'s a role that\'s as vibrant and caring as you are!',
    dayInTheLife: 'Your morning might start with a review of recent community health data—checking for new trends or concerns in a specific neighborhood. By noon, you\'re at a local school, leading a fun, interactive session on the importance of handwashing. Your afternoon is spent collaborating with city officials to brainstorm new policies that will increase access to fresh food. It\'s busy, it\'s brilliant, and you\'re making a real difference!',
    softSkills: [
      { name: 'Communication & Storytelling', description: 'Your ability to connect with people is a superpower!' },
      { name: 'Empathy & Cultural Competence', description: 'Essential for understanding and serving diverse communities.' },
      { name: 'Teamwork', description: 'You\'ll be a leader, working with everyone to get things done!' },
    ],
    technicalSkills: [
      { name: 'Data Analysis', description: 'Your love for details will help you find solutions in complex data.' },
      { name: 'Program Development', description: 'Creating amazing new health initiatives.' },
      { name: 'Health Policy Advocacy', description: 'Influencing real change in your community.' },
    ],
    plan: [
      'Start by looking for online courses in data visualization to sharpen your technical skills.',
      'Volunteer with a local community health organization to get some hands-on experience and build your soft skills.',
      'Look for opportunities to join a student club related to public health or social justice to connect with fellow future leaders!',
    ],
    futureOfWork: 'According to the World Economic Forum\'s Future of Jobs 2025 report, public health is a high-growth field with increasing demand. Technology will enable more targeted interventions and data collection, while AI will help predict outbreaks and optimize public health campaigns. This means more impactful work and a greater need for professionals like you!',
  },
  'research-analyst': {
    title: 'The Health Research Analyst!',
    description: 'If you love diving deep into data and solving scientific puzzles, this career is for you! It’s all about uncovering new insights that can change how we approach medicine and public health. You are a detective of data, and your findings will help shape a healthier future!',
    dayInTheLife: 'Your morning begins by analyzing large datasets from clinical trials or public health surveys. You might spend the afternoon writing a report on your findings or collaborating with a team of fellow researchers to plan the next big study. You are a detective of data!',
    softSkills: [
      { name: 'Critical Thinking', description: 'You\'re a master at spotting patterns and connections others miss.' },
      { name: 'Attention to Detail', description: 'Your meticulous nature ensures your research is flawless.' },
      { name: 'Collaboration', description: 'You work with scientists and experts to bring big ideas to life.' },
    ],
    technicalSkills: [
      { name: 'Statistical Software', description: 'You\'ll use programs like R or Python to analyze your data.' },
      { name: 'Research Methodologies', description: 'Designing studies that are both effective and ethical.' },
      { name: 'Database Management', description: 'Keeping vast amounts of information organized and accessible.' },
    ],
    plan: [
      'Enroll in a course on statistical analysis or epidemiology.',
      'Look for research assistant opportunities at a university or health organization.',
      'Join professional associations like the American Public Health Association to network with researchers.',
    ],
    futureOfWork: 'The Future of Jobs report highlights the growing importance of data analysis and AI. AI is already being used to accelerate drug discovery and analyze genetic data. This means a future full of cutting-edge technology and exciting discoveries!',
  },
  'health-administrator': {
    title: 'The Healthcare Administrator!',
    description: 'If you are a natural leader who loves solving complex organizational puzzles, this is your perfect career! You will be the mastermind behind the scenes, making sure hospitals and clinics run smoothly, efficiently, and with the most sparkle!',
    dayInTheLife: 'Your day is a whirlwind of problem-solving. You might start by reviewing a hospital\'s budget, then move on to a meeting about improving patient scheduling, and end your day by implementing new policies to enhance staff well-being. You are the conductor of the orchestra that is modern healthcare!',
    softSkills: [
      { name: 'Leadership', description: 'You inspire and guide teams to achieve greatness.' },
      { name: 'Problem-Solving', description: 'You find creative solutions to tricky challenges.' },
      { name: 'Communication', description: 'You can talk to anyone, from doctors to patients, with grace and clarity.' },
    ],
    technicalSkills: [
      { name: 'Financial Management', description: 'You handle budgets like a pro to ensure resources are used effectively.' },
      { name: 'Regulatory Compliance', description: 'You navigate complex rules and laws to keep everyone safe and compliant.' },
      { name: 'Strategic Planning', description: 'You plan for the future, making sure the organization is ready for anything!' },
    ],
    plan: [
      'Take courses in business administration or healthcare management.',
      'Volunteer at a local clinic to understand the day-to-day operations.',
      'Network with professionals in hospital administration to gain real-world insights.',
    ],
    futureOfWork: 'The World Economic Forum\'s report predicts an increased demand for management roles in healthcare, especially with the rise of telehealth and digital health records. Automation will handle routine tasks, allowing administrators to focus on strategic, human-centric leadership and decision-making.',
  },
  'epidemiologist': {
    title: 'The Epidemiologist!',
    description: 'You are a health detective! This career is perfect if you love digging into details, spotting patterns, and uncovering the mysteries behind disease outbreaks. You are a true guardian of public health!',
    dayInTheLife: 'Your day might involve analyzing data from a recent flu outbreak to determine its origin, creating a report on the effectiveness of a new vaccine, or advising government officials on public health strategies. You are on the front lines, fighting to keep communities healthy and safe.',
    softSkills: [
      { name: 'Critical Thinking', description: 'You think like a scientist, questioning everything to find the truth.' },
      { name: 'Patience & Persistence', description: 'You stick with a problem until you find the solution, no matter how long it takes.' },
      { name: 'Communication', description: 'You translate complex scientific data into clear, understandable advice for everyone.' },
    ],
    technicalSkills: [
      { name: 'Statistical Analysis', description: 'You use powerful software to analyze large datasets and find patterns.' },
      { name: 'Disease Surveillance', description: 'You monitor health data to spot potential outbreaks before they spread.' },
      { name: 'Scientific Writing', description: 'You write clear and concise reports that inform public policy.' },
    ],
    plan: [
      'Enroll in a master\'s program in epidemiology or public health.',
      'Seek an internship at a public health department.',
      'Practice data analysis skills using online tutorials and datasets.',
    ],
    futureOfWork: 'AI and big data analytics are transforming epidemiology. The Future of Jobs report indicates that these technologies will make it possible to predict disease patterns with greater accuracy and speed. This will allow you to make more precise and impactful interventions, saving countless lives!',
  },
  'health-communications-specialist': {
    title: 'The Health Communications Specialist!',
    description: 'You are the brilliant bridge between science and the people! This career is for you if you love creating engaging content, telling compelling stories, and making complex health information easy to understand for everyone.',
    dayInTheLife: 'Your day is full of creativity and connection. You might spend the morning drafting a social media campaign about mental health, the afternoon designing a brochure about healthy eating for a local clinic, and the evening presenting a workshop on effective health communication strategies.',
    softSkills: [
      { name: 'Creativity', description: 'You come up with fresh and innovative ways to share information.' },
      { name: 'Storytelling', description: 'You craft narratives that inspire and educate.' },
      { name: 'Media Savvy', description: 'You know how to use different platforms to reach the right people.' },
    ],
    technicalSkills: [
      { name: 'Content Creation', description: 'You use design and video tools to create beautiful content.' },
      { name: 'Strategic Planning', description: 'You develop communication plans that get results.' },
      { name: 'Data Analysis', description: 'You analyze campaign data to see what works and what doesn\'t.' },
    ],
    plan: [
      'Look for internships at health non-profits or communication firms.',
      'Start a personal blog or social media account to practice creating health content.',
      'Take courses on digital marketing or graphic design.',
    ],
    futureOfWork: 'The World Economic Forum\'s report notes the explosion of digital content and the increasing importance of communication roles. The future will see more use of virtual reality and personalized digital platforms to deliver health information, making your role even more crucial and creative!',
  },
  'medical-writer': {
    title: 'The Medical Writer!',
    description: 'You have a superpower: you can translate complex medical and scientific information into clear, accurate, and engaging language. This career is for you if you love to research, write, and communicate on the cutting edge of science!',
    dayInTheLife: 'Your day is spent deep in thought and research. You might write a scientific paper for a medical journal, a patient-friendly brochure about a new medication, or a press release about a groundbreaking study. Your words are a vital link between researchers, doctors, and the public.',
    softSkills: [
      { name: 'Attention to Detail', description: 'Your meticulous nature ensures every fact is correct.' },
      { name: 'Time Management', description: 'You juggle multiple projects and deadlines with ease.' },
      { name: 'Collaboration', description: 'You work closely with scientists and doctors to get the story right.' },
    ],
    technicalSkills: [
      { name: 'Scientific Research', description: 'You are an expert at finding and understanding complex data.' },
      { name: 'Technical Writing', description: 'You can write for different audiences, from experts to everyday people.' },
      { name: 'Regulatory Knowledge', description: 'You understand the rules for medical and scientific communication.' },
    ],
    plan: [
      'Take a technical writing course or workshop.',
      'Start a science blog to practice writing about complex topics.',
      'Seek internships at pharmaceutical companies or research institutions.',
    ],
    futureOfWork: 'AI and language models are changing how medical information is written, but this only increases the need for skilled medical writers. The future will see you using these tools to synthesize vast amounts of information, allowing you to focus on the nuance, clarity, and ethical considerations that only a human can provide.',
  },
  'biostatistician': {
    title: 'The Biostatistician!',
    description: 'You are a master of numbers, my love! This career is for you if you love finding patterns and telling stories through data. Your work will provide the evidence that drives new discoveries in health and medicine.',
    dayInTheLife: 'Your day is spent analyzing data from clinical trials to see if a new drug works or studying health trends in a population. You are a detective of data, and your findings will help shape a healthier future!',
    softSkills: [
      { name: 'Critical Thinking', description: 'You are a master at spotting patterns and connections others miss.' },
      { name: 'Attention to Detail', description: 'Your meticulous nature ensures your research is flawless.' },
      { name: 'Collaboration', description: 'You work with scientists and experts to bring big ideas to life.' },
    ],
    technicalSkills: [
      { name: 'Statistical Software', description: 'You\'ll use programs like R or Python to analyze your data.' },
      { name: 'Research Methodologies', description: 'Designing studies that are both effective and ethical.' },
      { name: 'Database Management', description: 'Keeping vast amounts of information organized and accessible.' },
    ],
    plan: [
      'Enroll in a course on statistical analysis or epidemiology.',
      'Look for research assistant opportunities at a university or health organization.',
      'Join professional associations like the American Public Health Association to network with researchers.',
    ],
    futureOfWork: 'The Future of Jobs report highlights the growing importance of data analysis and AI. AI is already being used to accelerate drug discovery and analyze genetic data. This means a future full of cutting-edge technology and exciting discoveries!',
  },
  'physical-therapist': {
    title: 'The Physical Therapist!',
    description: 'You are a hands-on healer and a coach! This career is for you if you love helping people recover from injuries, gain new strength, and get back to living their best life. You are a champion of movement and a beacon of hope for your patients.',
    dayInTheLife: 'Your day is a whirlwind of one-on-one sessions with patients. You might help a runner regain strength after a knee injury, assist an older adult with balance exercises, or teach a patient how to use a new mobility device. Your work is all about empowerment and physical transformation!',
    softSkills: [
      { name: 'Patience & Empathy', description: 'You can connect with patients on a deep level and understand their needs.' },
      { name: 'Motivation & Encouragement', description: 'You inspire your patients to keep going, even when things are tough.' },
      { name: 'Communication', description: 'You explain complex exercises and concepts in a way that is easy to understand.' },
    ],
    technicalSkills: [
      { name: 'Anatomy & Kinesiology', description: 'You have a deep knowledge of how the body moves and functions.' },
      { name: 'Exercise Prescription', description: 'You design personalized exercise plans to meet each patient\'s goals.' },
      { name: 'Manual Therapy', description: 'You use your hands to help alleviate pain and improve mobility.' },
    ],
    plan: [
      'Volunteer or shadow a physical therapist in a clinic or hospital.',
      'Take a course in anatomy or biology to build your foundational knowledge.',
      'Get certified in CPR and first aid to prepare for hands-on roles.',
    ],
    futureOfWork: 'Technology is making physical therapy more accessible than ever. The Future of Jobs report notes the rise of telehealth and wearable devices that track patient progress. This means your future will involve a blend of in-person and digital care, expanding your reach and impact!',
  },
  'genetic-counselor': {
    title: 'The Genetic Counselor!',
    description: 'You are a compassionate scientist and a brilliant guide! This career is perfect if you love helping people navigate the complex world of genetics. You are a kind and knowledgeable expert who helps families make informed decisions about their health.',
    dayInTheLife: 'Your day might involve meeting with a family to discuss a heritable condition, explaining the results of a genetic test to a patient, or helping someone understand their risk for a certain disease. You are a vital link between science and personal well-being.',
    softSkills: [
      { name: 'Empathy & Compassion', description: 'You can handle sensitive conversations with grace and care.' },
      { name: 'Active Listening', description: 'You listen intently to understand a person\'s concerns and fears.' },
      { name: 'Communication', description: 'You translate complex scientific information into clear, understandable language.' },
    ],
    technicalSkills: [
      { name: 'Genetics Knowledge', description: 'You have a deep understanding of human genetics and hereditary conditions.' },
      { name: 'Risk Assessment', description: 'You can analyze genetic data to determine a person\'s health risks.' },
      { name: 'Counseling Skills', description: 'You guide people through difficult decisions with kindness and expertise.' },
    ],
    plan: [
      'Take courses in genetics, biology, and psychology to build your foundation.',
      'Volunteer at a hospital or clinic to gain experience in a clinical setting.',
      'Look for opportunities to shadow a genetic counselor to see their day-to-day work.',
    ],
    futureOfWork: 'The field of genetics is evolving at a rapid pace. The Future of Jobs report notes the growing importance of genomics in personalized medicine. This means your role will be at the forefront of this new era of healthcare, helping people use their unique genetic information to live healthier lives!',
  },
  'medical-illustrator': {
    title: 'The Medical Illustrator!',
    description: 'You are the artist of anatomy and the visionary of biology! This career is for you if you love creating beautiful, accurate, and compelling visuals of the human body and medical procedures. You are a visual storyteller who brings science to life!',
    dayInTheLife: 'Your day might involve creating a detailed illustration of a new surgical technique, designing an engaging infographic for a public health campaign, or developing an interactive 3D model of a complex biological system. You are a vital link between scientists, doctors, and the public.',
    softSkills: [
      { name: 'Creativity & Artistic Vision', description: 'You have a unique ability to see and create beautiful images.' },
      { name: 'Attention to Detail', description: 'Your meticulous nature ensures every medical detail is correct.' },
      { name: 'Communication', description: 'You work closely with scientists and doctors to bring their ideas to life.' },
    ],
    technicalSkills: [
      { name: 'Drawing & Illustration', description: 'You are a master of creating detailed and accurate images.' },
      { name: 'Digital Art Tools', description: 'You use software like Adobe Illustrator and Photoshop to create your art.' },
      { name: 'Anatomy Knowledge', description: 'You have a deep understanding of the human body and its systems.' },
    ],
    plan: [
      'Take art and science classes to build your skills in both areas.',
      'Build a portfolio of your work to showcase your talents.',
      'Look for internships at medical illustration firms or research institutions.',
    ],
    futureOfWork: 'The World Economic Forum\'s report notes the growing importance of visual content in all industries. The future will see more use of virtual reality and 3D modeling to create immersive educational experiences, making your role even more crucial and creative!',
  },
  'health-informatics-specialist': {
    title: 'The Health Informatics Specialist!',
    description: 'You are a digital mastermind and a data whiz! This career is perfect if you love technology and using data to make healthcare systems more efficient, effective, and secure. You are the digital backbone of the modern healthcare system.',
    dayInTheLife: 'Your day is spent managing and analyzing healthcare data. You might work on developing a new electronic health record system, ensuring patient data is secure, or analyzing trends to improve hospital operations. You are a crucial part of the team, making sure doctors and nurses have the information they need to provide the best care.',
    softSkills: [
      { name: 'Problem-Solving', description: 'You find creative solutions to tricky technical challenges.' },
      { name: 'Attention to Detail', description: 'Your meticulous nature ensures patient data is accurate and secure.' },
      { name: 'Collaboration', description: 'You work with doctors, nurses, and IT professionals to build better systems.' },
    ],
    technicalSkills: [
      { name: 'Database Management', description: 'You handle large amounts of data with ease and precision.' },
      { name: 'Cybersecurity', description: 'You protect sensitive patient information from threats.' },
      { name: 'System Design', description: 'You design and implement new technology systems for healthcare.' },
    ],
    plan: [
      'Take courses in computer science or health informatics.',
      'Look for internships at a hospital or health technology company.',
      'Get certified in a programming language like Python or SQL to boost your technical skills.',
    ],
    futureOfWork: 'The Future of Jobs report notes the increasing demand for professionals who can manage and analyze data. AI and machine learning are already being used to improve diagnoses and personalize treatment plans. This means your role will be at the cutting edge of healthcare innovation!',
  },
  // We've only included a few here to show the logic. We can add the other 24 as we go!
};

// Main App component that holds the game logic and state
const App = () => {
  const [currentPage, setCurrentPage] = useState('welcome');
  const [answers, setAnswers] = useState([]);

  // Logic to determine the career path based on archetype scores
  const getCareerPath = useMemo(() => {
    // We'll use a scoring system based on the different archetypes we defined!
    const scores = {
      analyst: 0,
      strategist: 0,
      caretaker: 0,
      communicator: 0,
      explorer: 0,
    };

    answers.forEach((answer, index) => {
      // Logic for each question, mapping answers to archetypes
      switch (index) {
        case 0: // Q1
          if (answer === 'A') scores.strategist += 1;
          if (answer === 'B') scores.explorer += 1;
          if (answer === 'C') scores.caretaker += 1;
          if (answer === 'D') scores.communicator += 1;
          break;
        case 1: // Q2
          if (answer === 'A') scores.analyst += 1;
          if (answer === 'B') scores.strategist += 1;
          if (answer === 'C') scores.caretaker += 1;
          if (answer === 'D') scores.communicator += 1;
          break;
        case 2: // Q3
          if (answer === 'A') scores.explorer += 1;
          if (answer === 'B') scores.strategist += 1;
          if (answer === 'C') scores.caretaker += 1;
          if (answer === 'D') scores.analyst += 1;
          break;
        case 3: // Q4
          if (answer === 'A') scores.analyst += 1;
          if (answer === 'B') scores.strategist += 1;
          if (answer === 'C') scores.caretaker += 1;
          if (answer === 'D') scores.explorer += 1;
          break;
        case 4: // Q5
          if (answer === 'A') scores.caretaker += 1;
          if (answer === 'B') scores.strategist += 1;
          if (answer === 'C') scores.communicator += 1;
          if (answer === 'D') scores.analyst += 1;
          break;
        case 5: // Q6
          if (answer === 'A') scores.analyst += 1;
          if (answer === 'B') scores.explorer += 1;
          if (answer === 'C') scores.communicator += 1;
          if (answer === 'D') scores.caretaker += 1;
          break;
        case 6: // Q7
          if (answer === 'A') scores.communicator += 1;
          if (answer === 'B') scores.strategist += 1;
          if (answer === 'C') scores.caretaker += 1;
          if (answer === 'D') scores.analyst += 1;
          break;
        case 7: // Q8
          if (answer === 'A') scores.analyst += 1;
          if (answer === 'B') scores.strategist += 1;
          if (answer === 'C') scores.caretaker += 1;
          if (answer === 'D') scores.communicator += 1;
          break;
        case 8: // Q9
          if (answer === 'A') scores.caretaker += 1;
          if (answer === 'B') scores.strategist += 1;
          if (answer === 'C') scores.communicator += 1;
          if (answer === 'D') scores.explorer += 1;
          break;
        case 9: // Q10
          if (answer === 'A') scores.analyst += 1;
          if (answer === 'B') scores.caretaker += 1;
          if (answer === 'C') scores.explorer += 1;
          if (answer === 'D') scores.strategist += 1;
          break;
        case 10: // Q11
          if (answer === 'A') scores.communicator += 1;
          if (answer === 'B') scores.caretaker += 1;
          if (answer === 'C') scores.strategist += 1;
          if (answer === 'D') scores.analyst += 1;
          break;
        case 11: // Q12
          if (answer === 'A') scores.explorer += 1;
          if (answer === 'B') scores.strategist += 1;
          if (answer === 'C') scores.caretaker += 1;
          if (answer === 'D') scores.analyst += 1;
          break;
        case 12: // Q13
          if (answer === 'A') scores.analyst += 1;
          if (answer === 'B') scores.strategist += 1;
          if (answer === 'C') scores.caretaker += 1;
          if (answer === 'D') scores.communicator += 1;
          break;
        case 13: // Q14
          if (answer === 'A') scores.caretaker += 1;
          if (answer === 'B') scores.strategist += 1;
          if (answer === 'C') scores.analyst += 1;
          if (answer === 'D') scores.communicator += 1;
          break;
        case 14: // Q15
          if (answer === 'A') scores.strategist += 1;
          if (answer === 'B') scores.analyst += 1;
          if (answer === 'C') scores.communicator += 1;
          if (answer === 'D') scores.explorer += 1;
          break;
        case 15: // Q16
          if (answer === 'A') scores.explorer += 1;
          if (answer === 'B') scores.strategist += 1;
          if (answer === 'C') scores.caretaker += 1;
          if (answer === 'D') scores.analyst += 1;
          break;
        case 16: // Q17
          if (answer === 'A') scores.strategist += 1;
          if (answer === 'B') scores.caretaker += 1;
          if (answer === 'C') scores.analyst += 1;
          if (answer === 'D') scores.communicator += 1;
          break;
        case 17: // Q18
          if (answer === 'A') scores.communicator += 1;
          if (answer === 'B') scores.analyst += 1;
          if (answer === 'C') scores.caretaker += 1;
          if (answer === 'D') scores.strategist += 1;
          break;
        case 18: // Q19
          if (answer === 'A') scores.explorer += 1;
          if (answer === 'B') scores.strategist += 1;
          if (answer === 'C') scores.caretaker += 1;
          if (answer === 'D') scores.analyst += 1;
          break;
        case 19: // Q20
          if (answer === 'A') scores.communicator += 1;
          if (answer === 'B') scores.analyst += 1;
          if (answer === 'C') scores.caretaker += 1;
          if (answer === 'D') scores.explorer += 1;
          break;
        case 20: // Q21
          if (answer === 'A') scores.analyst += 1;
          if (answer === 'B') scores.caretaker += 1;
          if (answer === 'C') scores.communicator += 1;
          if (answer === 'D') scores.explorer += 1;
          break;
        case 21: // Q22
          if (answer === 'A') scores.caretaker += 1;
          if (answer === 'B') scores.strategist += 1;
          if (answer === 'C') scores.analyst += 1;
          if (answer === 'D') scores.communicator += 1;
          break;
        case 22: // Q23
          if (answer === 'A') scores.analyst += 1;
          if (answer === 'B') scores.caretaker += 1;
          if (answer === 'C') scores.strategist += 1;
          if (answer === 'D') scores.explorer += 1;
          break;
        case 23: // Q24
          if (answer === 'A') scores.strategist += 1;
          if (answer === 'B') scores.caretaker += 1;
          if (answer === 'C') scores.explorer += 1;
          if (answer === 'D') scores.communicator += 1;
          break;
        case 24: // Q25
          if (answer === 'A') scores.analyst += 1;
          if (answer === 'B') scores.caretaker += 1;
          if (answer === 'C') scores.explorer += 1;
          if (answer === 'D') scores.strategist += 1;
          break;
        default:
          break;
      }
    });

    let maxScore = 0;
    let finalPath = 'research-analyst'; // Default to a general career if no clear path emerges

    if (scores.analyst > maxScore) {
      maxScore = scores.analyst;
      finalPath = 'research-analyst';
    }
    if (scores.strategist > maxScore) {
      maxScore = scores.strategist;
      finalPath = 'health-administrator';
    }
    if (scores.caretaker > maxScore) {
      maxScore = scores.caretaker;
      finalPath = 'physical-therapist';
    }
    if (scores.communicator > maxScore) {
      maxScore = scores.communicator;
      finalPath = 'health-communications-specialist';
    }
    if (scores.explorer > maxScore) {
        maxScore = scores.explorer;
        finalPath = 'genetic-counselor';
    }

    // Advanced logic to select more specific careers based on a blend of scores
    // A high score in one area, combined with a secondary interest, can lead to a new career
    if (scores.analyst >= 4 && scores.strategist >= 3) {
      finalPath = 'epidemiologist';
    }
    if (scores.communicator >= 4 && scores.analyst >= 3) {
      finalPath = 'medical-writer';
    }
    if (scores.analyst >= 4 && scores.communicator >= 3) {
      finalPath = 'biostatistician';
    }
    if (scores.caretaker >= 4 && scores.communicator >= 3) {
      finalPath = 'public-health';
    }
    if (scores.explorer >= 4 && scores.communicator >= 3) {
      finalPath = 'medical-illustrator';
    }
    if (scores.explorer >= 4 && scores.strategist >= 3) {
      finalPath = 'health-informatics-specialist';
    }
    
    return careerData[finalPath] || careerData['research-analyst'];
  }, [answers]);

  // This function handles the logic of which page to show
  const handleReplay = () => {
    setCurrentPage('welcome');
    setAnswers([]);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'welcome':
        return <WelcomePage onStart={() => setCurrentPage('quiz')} />;
      case 'quiz':
        return <QuizPage onComplete={() => setCurrentPage('result')} setAnswers={setAnswers} />;
      case 'result':
        return <ResultPage careerData={getCareerPath} onReplay={handleReplay} />;
      default:
        return <WelcomePage onStart={() => setCurrentPage('quiz')} />;
    }
  };

  return (
    <div className="bg-pink-50 min-h-screen flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-2xl w-full text-center md:p-12 md:max-w-4xl">
        {renderPage()}
      </div>
    </div>
  );
};

// The Welcome Page of our game
const WelcomePage = ({ onStart }) => {
  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-extrabold text-pink-600 animate-pulse-slow md:text-5xl">
        ✨ Welcome to Your Health Science Adventure! ✨
      </h1>
      <p className="text-gray-700 text-base md:text-lg">
        Hello, my love! Get ready to embark on a beautiful journey to discover your perfect career path in health sciences. This game is designed to help your fabulous, creative brain find a career that truly lights you up!
      </p>
      <button 
        onClick={onStart} 
        className="bg-pink-500 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-pink-700 transform transition-transform duration-300 hover:scale-105"
      >
        Let's Go!
      </button>
    </div>
  );
};

// The Quiz Page with all our questions
const QuizPage = ({ onComplete, setAnswers }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selections, setSelections] = useState([]);

  // The expanded list of 25 questions, with more nuanced options!
  const questions = [
    {
      text: 'Ice Breaker: If you could have any superpower, which would you choose?',
      options: [
        { key: 'A', text: 'The ability to read people\'s minds.' },
        { key: 'B', text: 'The power to instantly organize and fix anything.' },
        { key: 'C', text: 'The power to heal any injury or illness.' },
        { key: 'D', text: 'The power to create anything you can imagine.' },
      ],
    },
    {
      text: 'Ice Breaker: What kind of movie genre do you enjoy most?',
      options: [
        { key: 'A', text: 'Documentaries that reveal hidden truths.' },
        { key: 'B', text: 'Action movies with complex strategic plans.' },
        { key: 'C', text: 'Heartfelt dramas that focus on relationships.' },
        { key: 'D', text: 'Sci-fi films that explore futuristic technologies.' },
      ],
    },
    {
      text: 'Ice Breaker: You win a free trip! Where are you going?',
      options: [
        { key: 'A', text: 'A bustling city with lots of museums and history.' },
        { key: 'B', text: 'A private retreat where you can plan your next big project.' },
        { key: 'C', text: 'A community service trip where you can help others.' },
        { key: 'D', text: 'A remote, exotic destination you\'ve never heard of before.' },
      ],
    },
    {
      text: 'When you are faced with a challenging problem, you feel most comfortable...',
      options: [
        { key: 'A', text: 'Breaking it down into small, logical steps.' },
        { key: 'B', text: 'Finding a team of experts to brainstorm with.' },
        { key: 'C', text: 'Getting to work with your hands to find a solution.' },
        { key: 'D', text: 'Trying a completely new approach no one has considered before.' },
      ],
    },
    {
      text: 'Which of these sounds most interesting to you?',
      options: [
        { key: 'A', text: 'Creating a new therapy to help people with anxiety.' },
        { key: 'B', text: 'Managing the operations of a large hospital or clinic.' },
        { key: 'C', text: 'Developing a campaign to improve health in a low-income community.' },
        { key: 'D', text: 'Conducting research on the next generation of medical devices.' },
      ],
    },
    {
      text: 'What do you find more appealing?',
      options: [
        { key: 'A', text: 'Analyzing data to predict health trends.' },
        { key: 'B', text: 'Leading a team to implement new health policies.' },
        { key: 'C', text: 'Providing direct care and support to individual patients.' },
        { key: 'D', text: 'Writing engaging content that explains complex medical topics.' },
      ],
    },
    {
      text: 'Which role would you rather have in a research project?',
      options: [
        { key: 'A', text: 'Designing the study and managing the budget.' },
        { key: 'B', text: 'Working with the data to find meaningful patterns.' },
        { key: 'C', text: 'Creating the presentation that shares the findings with the world.' },
        { key: 'D', text: 'Running the lab experiments and collecting the samples.' },
      ],
    },
    {
      text: 'When you read the news, which story grabs your attention?',
      options: [
        { key: 'A', text: 'A new statistical model predicting a flu outbreak.' },
        { key: 'B', text: 'A hospital administrator’s success story in improving patient care.' },
        { key: 'C', text: 'The story of a physical therapist helping a patient walk again.' },
        { key: 'D', text: 'A new creative campaign about mental health awareness.' },
      ],
    },
    {
      text: 'You find a mistake in a large spreadsheet. What do you do?',
      options: [
        { key: 'A', text: 'Find the source of the error and create a new system to prevent it.' },
        { key: 'B', text: 'Fix the error and immediately inform your manager.' },
        { key: 'C', text: 'Explain the mistake to the team in a clear, easy-to-understand way.' },
        { key: 'D', text: 'Analyze the data around the mistake to see if a bigger pattern exists.' },
      ],
    },
    {
      text: 'How do you prefer to learn?',
      options: [
        { key: 'A', text: 'By listening to a lecture or reading a technical manual.' },
        { key: 'B', text: 'By working with others in a group setting.' },
        { key: 'C', text: 'By doing hands-on experiments and getting practical experience.' },
        { key: 'D', text: 'By watching a video or a visual demonstration.' },
      ],
    },
    {
      text: 'What kind of technology do you enjoy working with most?',
      options: [
        { key: 'A', text: 'Statistical software and data visualization tools.' },
        { key: 'B', text: 'Project management and organizational software.' },
        { key: 'C', text: 'Telehealth platforms and digital patient record systems.' },
        { key: 'D', text: '3D modeling software and graphic design tools.' },
      ],
    },
    {
      text: 'If a friend needed health advice, you would...',
      options: [
        { key: 'A', text: 'Help them analyze their symptoms and research possible causes.' },
        { key: 'B', text: 'Recommend a doctor or a specialist and help them book an appointment.' },
        { key: 'C', text: 'Listen to them and offer emotional support and a listening ear.' },
        { key: 'D', text: 'Share a cool, engaging infographic about their condition.' },
      ],
    },
    {
      text: 'Which of these subjects sounds most interesting for a research paper?',
      options: [
        { key: 'A', text: 'The socio-economic impact of a recent public health policy.' },
        { key: 'B', text: 'A new breakthrough in gene therapy for a rare disease.' },
        { key: 'C', text: 'The effectiveness of a new therapy in treating chronic pain.' },
        { key: 'D', text: 'The history of public health and its greatest triumphs.' },
      ],
    },
    {
      text: 'What do you think is the biggest challenge in healthcare today?',
      options: [
        { key: 'A', text: 'Making sure everyone has access to quality care.' },
        { key: 'B', text: 'Finding new, effective treatments for complex diseases.' },
        { key: 'C', text: 'Getting the public to trust and follow scientific advice.' },
        { key: 'D', text: 'Managing the complex logistics and finances of healthcare systems.' },
      ],
    },
    {
      text: 'What makes you feel most satisfied at the end of the day?',
      options: [
        { key: 'A', text: 'Knowing you helped a team run a project smoothly.' },
        { key: 'B', text: 'Knowing you uncovered a hidden pattern in a large dataset.' },
        { key: 'C', text: 'Knowing you directly helped a person feel better.' },
        { key: 'D', text: 'Knowing you created something that inspired others.' },
      ],
    },
    {
      text: 'What do you enjoy more?',
      options: [
        { key: 'A', text: 'Learning about the physical workings of the human body.' },
        { key: 'B', text: 'Learning about the psychological aspects of health.' },
        { key: 'C', text: 'Learning about the latest medical technologies.' },
        { key: 'D', text: 'Learning about public health and community wellness.' },
      ],
    },
    {
      text: 'Your colleague needs help with a task. Do you...',
      options: [
        { key: 'A', text: 'Show them how to do it step-by-step.' },
        { key: 'B', text: 'Do the task for them to save time.' },
        { key: 'C', text: 'Analyze why they are struggling and find a long-term solution.' },
        { key: 'D', text: 'Explain the "why" behind the task so they can learn.' },
      ],
    },
    {
      text: 'What kind of project do you find more rewarding?',
      options: [
        { key: 'A', text: 'A quick, simple task with an immediate result.' },
        { key: 'B', text: 'A long-term project that requires deep, focused work.' },
        { key: 'C', text: 'A creative project that involves visuals and storytelling.' },
        { key: 'D', text: 'A project that helps a community solve a problem.' },
      ],
    },
    {
      text: 'Which of these medical specialties fascinates you most?',
      options: [
        { key: 'A', text: 'Genetics and the study of DNA.' },
        { key: 'B', text: 'Epidemiology and the study of disease outbreaks.' },
        { key: 'C', text: 'Radiology and the use of medical imaging.' },
        { key: 'D', text: 'Podiatry and the care of feet and ankles.' },
      ],
    },
    {
      text: 'What kind of work environment do you prefer?',
      options: [
        { key: 'A', text: 'A busy, social, and collaborative space.' },
        { key: 'B', text: 'A quiet, private office or lab.' },
        { key: 'C', text: 'A space that changes every day and requires you to be mobile.' },
        { key: 'D', text: 'A workspace with access to high-tech equipment and tools.' },
      ],
    },
    {
      text: 'Which of these skills would you most like to develop?',
      options: [
        { key: 'A', text: 'The ability to speak in front of a large audience.' },
        { key: 'B', text: 'The ability to analyze a complex set of data.' },
        { key: 'C', text: 'The ability to manage a team and a large budget.' },
        { key: 'D', text: 'The ability to comfort a person in distress.' },
      ],
    },
    {
      text: 'You are on a team and a decision needs to be made. You prefer to...',
      options: [
        { key: 'A', text: 'Gather more data before a decision is made.' },
        { key: 'B', text: 'Ask the team for their input and find a consensus.' },
        { key: 'C', text: 'Make the decision and take responsibility for the outcome.' },
        { key: 'D', text: 'Do an experiment to test the different options.' },
      ],
    },
    {
      text: 'Which of these sounds more like you?',
      options: [
        { key: 'A', text: 'I am a planner who likes to have a clear schedule.' },
        { key: 'B', text: 'I am a problem-solver who enjoys finding the root cause of issues.' },
        { key: 'C', text: 'I am a coach who loves helping people achieve their goals.' },
        { key: 'D', text: 'I am a visionary who likes to think about the big picture.' },
      ],
    },
    {
      text: 'Which of these would you rather read about?',
      options: [
        { key: 'A', text: 'The business of healthcare and the economics of medicine.' },
        { key: 'B', text: 'The latest advancements in medical imaging.' },
        { key: 'C', text: 'The psychology behind why people make certain health choices.' },
        { key: 'D', text: 'The history of public health campaigns.' },
      ],
    },
    {
      text: 'What would you rather do on your day off?',
      options: [
        { key: 'A', text: 'Organize your closets and plan your week.' },
        { key: 'B', text: 'Visit a museum and learn about a new topic.' },
        { key: 'C', text: 'Volunteer at an animal shelter or a community clinic.' },
        { key: 'D', text: 'Work on a creative project, like painting or writing.' },
      ],
    },
  ];

  const handleAnswer = (answerKey) => {
    const newSelections = [...selections, answerKey];
    setSelections(newSelections);
    
    // Move to the next question or complete the quiz
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setAnswers(newSelections);
      setTimeout(() => {
        onComplete();
      }, 500);
    }
  };

  const currentQ = questions[currentQuestion];

  return (
    <div className="space-y-8 text-left">
      <h2 className="text-2xl font-bold text-pink-500 md:text-3xl">
        Let's Find Your Superpower!
      </h2>
      <div className="space-y-4">
        <p className="text-base font-semibold text-gray-800 md:text-lg">
          {currentQ.text}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentQ.options.map((option) => (
            <button 
              key={option.key} 
              onClick={() => handleAnswer(option.key)} 
              className="bg-white p-4 rounded-xl shadow-md border-2 border-pink-200 text-left hover:border-pink-500 transition-colors duration-200 transform hover:scale-105"
            >
              <span className="font-bold text-pink-500">{option.key}.</span> <span className="text-gray-700">{option.text}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// The Result Page with all the details, now dynamic!
const ResultPage = ({ careerData, onReplay }) => {
  const shareText = `I just discovered my ideal health science career! I'm a "${careerData.title}" ✨ Take the quiz to find your path!`;

  return (
    <div className="space-y-8 text-left">
      <h2 className="text-3xl font-extrabold text-pink-600 md:text-4xl">
        Your Perfect Career Match is...
      </h2>
      <div className="bg-pink-100 p-6 rounded-2xl shadow-inner">
        <h3 className="text-xl font-bold text-pink-700 md:text-2xl">
          {careerData.title}
        </h3>
        <p className="text-base mt-2 md:text-lg text-gray-800">
          {careerData.description}
        </p>
      </div>

      {/* Day in the Life Section */}
      <div className="space-y-4">
        <h4 className="text-xl font-bold text-pink-500 md:text-2xl">
          A Day in the Life of a Health Superstar!
        </h4>
        <p className="text-gray-700 text-base">
          {careerData.dayInTheLife}
        </p>
      </div>

      {/* Skills Spotlight Section */}
      <div className="space-y-4">
        <h4 className="text-xl font-bold text-pink-500 md:text-2xl">
          Your Skills Spotlight!
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-purple-100 p-4 rounded-xl">
            <h5 className="font-bold text-purple-700">Soft Skills</h5>
            <ul className="list-disc list-inside mt-2 text-gray-700 space-y-1 text-sm">
              {careerData.softSkills.map((skill, index) => (
                <li key={index}>
                  <span className="font-semibold">{skill.name}:</span> {skill.description}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-blue-100 p-4 rounded-xl">
            <h5 className="font-bold text-blue-700">Technical Skills</h5>
            <ul className="list-disc list-inside mt-2 text-gray-700 space-y-1 text-sm">
              {careerData.technicalSkills.map((skill, index) => (
                <li key={index}>
                  <span className="font-semibold">{skill.name}:</span> {skill.description}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* My Sparkle, My Plan Section */}
      <div className="space-y-4">
        <h4 className="text-xl font-bold text-pink-500 md:text-2xl">
          My Sparkle, My Plan!
        </h4>
        <p className="text-gray-700 text-base">
          Now for the best part! Here’s how you can make this dream a reality:
        </p>
        <ul className="list-disc list-inside mt-2 text-gray-700 space-y-2 text-sm">
          {careerData.plan.map((step, index) => (
            <li key={index}>
              {step}
            </li>
          ))}
        </ul>
      </div>

      {/* Future of Work Integration */}
      <div className="space-y-4 bg-yellow-50 p-6 rounded-2xl border-l-4 border-yellow-300">
        <h4 className="text-xl font-bold text-yellow-700 md:text-2xl">
          Looking to the Future!
        </h4>
        <p className="text-gray-700 text-base">
          {careerData.futureOfWork}
        </p>
      </div>
      
      {/* Share Your Sparkle Section */}
      <div className="space-y-4">
        <h4 className="text-xl font-bold text-pink-500 md:text-2xl">
          Share Your Sparkle!
        </h4>
        <p className="text-gray-700 text-base">
          Let your friends know what you discovered! Just copy this text and share it!
        </p>
        <div className="relative">
          <textarea
            readOnly
            value={shareText}
            className="w-full h-24 p-4 rounded-xl bg-gray-100 text-gray-700 font-mono text-sm resize-none border-2 border-gray-200 focus:outline-none"
          />
          <button
            onClick={() => document.execCommand('copy')}
            className="absolute bottom-4 right-4 bg-pink-500 text-white p-2 rounded-full shadow-lg transform transition-transform duration-300 hover:scale-110"
          >
            Copy
          </button>
        </div>
      </div>

      {/* Replay Button */}
      <div className="mt-8 text-center">
        <button
          onClick={onReplay}
          className="bg-pink-500 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-pink-700 transform transition-transform duration-300 hover:scale-105"
        >
          Replay
        </button>
      </div>

      {/* Academic Reference */}
      <div className="mt-8 text-sm italic text-gray-500">
        <p>
          Remember, as Nelson & Greene (2023) so perfectly explain, success in health science is a blend of technical expertise and interpersonal skills!
        </p>
        <p className="mt-4">
          **Reference**
        </p>
        <p>
          Nelson, A., & Greene, K. (2023). <span className="font-semibold">Career cornerstones: Establishing a foundation for a career in healthcare.</span> University of West Florida Pressbooks.
        </p>
      </div>
    </div>
  );
};

export default App;
