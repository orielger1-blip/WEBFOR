import { useState } from 'react';
import AgentiveRobot, { RobotPose, RobotExpression, PeekDirection } from './AgentiveRobot';
import './AgentiveRobot.css';

// ============================================================================
// AGENTIVE ROBOT DEMO COMPONENT
// Interactive showcase of all robot poses and expressions
// ============================================================================

const AgentiveRobotDemo = () => {
  const [currentPose, setCurrentPose] = useState<RobotPose>('idle');
  const [currentExpression, setCurrentExpression] = useState<RobotExpression>('neutral');
  const [animated, setAnimated] = useState(true);
  const [size, setSize] = useState(120);
  const [peekFrom, setPeekFrom] = useState<PeekDirection>('bottom-right');

  const poses: RobotPose[] = ['idle', 'waving', 'sleeping', 'thinking', 'celebrating', 'peeking'];
  const expressions: RobotExpression[] = ['neutral', 'happy', 'sleepy', 'curious', 'excited', 'surprised'];
  const peekDirections: PeekDirection[] = ['top', 'bottom', 'left', 'right', 'top-right', 'top-left', 'bottom-right', 'bottom-left'];

  return (
    <div style={{
      minHeight: '100vh',
      background: '#050508',
      color: '#ffffff',
      padding: '40px',
      fontFamily: 'Heebo, sans-serif'
    }}>
      <h1 style={{
        fontSize: '2.5rem',
        fontWeight: 800,
        marginBottom: '8px',
        background: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 50%, #f59e0b 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text'
      }}>
        Agentive Robot Mascot
      </h1>
      <p style={{ color: '#a0a0b0', marginBottom: '40px' }}>
        Interactive design preview - Golden dashed-line wireframe style
      </p>

      {/* Main Preview */}
      <div style={{
        display: 'flex',
        gap: '60px',
        alignItems: 'flex-start',
        flexWrap: 'wrap'
      }}>
        {/* Robot Display */}
        <div style={{
          flex: '1',
          minWidth: '300px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '60px',
          background: 'rgba(255, 255, 255, 0.02)',
          borderRadius: '20px',
          border: '1px solid rgba(255, 255, 255, 0.06)'
        }}>
          <AgentiveRobot
            pose={currentPose}
            expression={currentExpression}
            size={size}
            animated={animated}
            peekFrom={peekFrom}
            showLegs={currentPose !== 'peeking'}
            showChestDetails={true}
          />
          <p style={{
            marginTop: '30px',
            color: '#f59e0b',
            fontSize: '1.2rem',
            fontWeight: 600,
            textTransform: 'capitalize'
          }}>
            {currentPose} - {currentExpression}
          </p>
        </div>

        {/* Controls */}
        <div style={{ flex: '1', minWidth: '300px' }}>
          {/* Pose Selection */}
          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ color: '#f59e0b', marginBottom: '12px', fontSize: '0.9rem', letterSpacing: '2px', textTransform: 'uppercase' }}>
              Pose
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {poses.map(pose => (
                <button
                  key={pose}
                  onClick={() => setCurrentPose(pose)}
                  style={{
                    padding: '10px 20px',
                    background: currentPose === pose ? 'linear-gradient(135deg, #f59e0b, #fbbf24)' : 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid',
                    borderColor: currentPose === pose ? '#f59e0b' : 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    color: currentPose === pose ? '#000' : '#fff',
                    cursor: 'pointer',
                    fontWeight: currentPose === pose ? 700 : 500,
                    textTransform: 'capitalize',
                    transition: 'all 0.2s'
                  }}
                >
                  {pose}
                </button>
              ))}
            </div>
          </div>

          {/* Expression Selection */}
          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ color: '#f59e0b', marginBottom: '12px', fontSize: '0.9rem', letterSpacing: '2px', textTransform: 'uppercase' }}>
              Expression
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {expressions.map(expr => (
                <button
                  key={expr}
                  onClick={() => setCurrentExpression(expr)}
                  style={{
                    padding: '10px 20px',
                    background: currentExpression === expr ? 'linear-gradient(135deg, #f59e0b, #fbbf24)' : 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid',
                    borderColor: currentExpression === expr ? '#f59e0b' : 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    color: currentExpression === expr ? '#000' : '#fff',
                    cursor: 'pointer',
                    fontWeight: currentExpression === expr ? 700 : 500,
                    textTransform: 'capitalize',
                    transition: 'all 0.2s'
                  }}
                >
                  {expr}
                </button>
              ))}
            </div>
          </div>

          {/* Peek Direction (only shown when peeking) */}
          {currentPose === 'peeking' && (
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{ color: '#f59e0b', marginBottom: '12px', fontSize: '0.9rem', letterSpacing: '2px', textTransform: 'uppercase' }}>
                Peek Direction
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {peekDirections.map(dir => (
                  <button
                    key={dir}
                    onClick={() => setPeekFrom(dir)}
                    style={{
                      padding: '8px 16px',
                      background: peekFrom === dir ? 'linear-gradient(135deg, #f59e0b, #fbbf24)' : 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid',
                      borderColor: peekFrom === dir ? '#f59e0b' : 'rgba(255, 255, 255, 0.1)',
                      borderRadius: '8px',
                      color: peekFrom === dir ? '#000' : '#fff',
                      cursor: 'pointer',
                      fontSize: '0.85rem',
                      transition: 'all 0.2s'
                    }}
                  >
                    {dir}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size Slider */}
          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ color: '#f59e0b', marginBottom: '12px', fontSize: '0.9rem', letterSpacing: '2px', textTransform: 'uppercase' }}>
              Size: {size}px
            </h3>
            <input
              type="range"
              min="40"
              max="200"
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              style={{
                width: '100%',
                accentColor: '#f59e0b'
              }}
            />
          </div>

          {/* Animation Toggle */}
          <div style={{ marginBottom: '32px' }}>
            <label style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              cursor: 'pointer'
            }}>
              <input
                type="checkbox"
                checked={animated}
                onChange={(e) => setAnimated(e.target.checked)}
                style={{ accentColor: '#f59e0b', width: '20px', height: '20px' }}
              />
              <span style={{ color: '#fff' }}>Enable Animations</span>
            </label>
          </div>
        </div>
      </div>

      {/* All Poses Gallery */}
      <div style={{ marginTop: '80px' }}>
        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: 700,
          marginBottom: '24px',
          color: '#fff'
        }}>
          All Poses Gallery
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
          gap: '24px'
        }}>
          {poses.map(pose => (
            <div
              key={pose}
              style={{
                padding: '32px',
                background: 'rgba(255, 255, 255, 0.02)',
                borderRadius: '16px',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '16px',
                transition: 'all 0.3s',
                cursor: 'pointer'
              }}
              onClick={() => setCurrentPose(pose)}
            >
              <AgentiveRobot
                pose={pose}
                size={80}
                animated={true}
                showLegs={pose !== 'peeking' && pose !== 'sleeping'}
              />
              <span style={{
                color: '#f59e0b',
                fontWeight: 600,
                textTransform: 'capitalize',
                fontSize: '0.95rem'
              }}>
                {pose}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Expression Gallery */}
      <div style={{ marginTop: '60px' }}>
        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: 700,
          marginBottom: '24px',
          color: '#fff'
        }}>
          Expression Gallery
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
          gap: '20px'
        }}>
          {expressions.map(expr => (
            <div
              key={expr}
              style={{
                padding: '24px',
                background: 'rgba(255, 255, 255, 0.02)',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '12px',
                cursor: 'pointer'
              }}
              onClick={() => setCurrentExpression(expr)}
            >
              <AgentiveRobot
                pose="idle"
                expression={expr}
                size={60}
                animated={false}
                showLegs={false}
              />
              <span style={{
                color: '#a0a0b0',
                fontSize: '0.85rem',
                textTransform: 'capitalize'
              }}>
                {expr}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Usage Examples */}
      <div style={{ marginTop: '80px' }}>
        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: 700,
          marginBottom: '24px',
          color: '#fff'
        }}>
          Usage Examples
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '24px'
        }}>
          {/* Loading State Example */}
          <div style={{
            padding: '32px',
            background: 'rgba(255, 255, 255, 0.02)',
            borderRadius: '16px',
            border: '1px solid rgba(255, 255, 255, 0.06)'
          }}>
            <h4 style={{ color: '#f59e0b', marginBottom: '16px' }}>Loading State</h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <AgentiveRobot pose="thinking" size={48} animated={true} showLegs={false} />
              <span style={{ color: '#a0a0b0' }}>Processing your request...</span>
            </div>
          </div>

          {/* Success State Example */}
          <div style={{
            padding: '32px',
            background: 'rgba(255, 255, 255, 0.02)',
            borderRadius: '16px',
            border: '1px solid rgba(255, 255, 255, 0.06)'
          }}>
            <h4 style={{ color: '#f59e0b', marginBottom: '16px' }}>Success State</h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <AgentiveRobot pose="celebrating" size={48} animated={true} showLegs={false} />
              <span style={{ color: '#a0a0b0' }}>Task completed successfully!</span>
            </div>
          </div>

          {/* Empty State Example */}
          <div style={{
            padding: '32px',
            background: 'rgba(255, 255, 255, 0.02)',
            borderRadius: '16px',
            border: '1px solid rgba(255, 255, 255, 0.06)'
          }}>
            <h4 style={{ color: '#f59e0b', marginBottom: '16px' }}>Empty State</h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <AgentiveRobot pose="waving" expression="curious" size={48} animated={true} showLegs={false} />
              <span style={{ color: '#a0a0b0' }}>No items yet. Let's get started!</span>
            </div>
          </div>

          {/* 24/7 Availability Example */}
          <div style={{
            padding: '32px',
            background: 'rgba(255, 255, 255, 0.02)',
            borderRadius: '16px',
            border: '1px solid rgba(255, 255, 255, 0.06)'
          }}>
            <h4 style={{ color: '#f59e0b', marginBottom: '16px' }}>24/7 Availability</h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <AgentiveRobot pose="idle" expression="neutral" size={48} animated={true} showLegs={false} />
              <span style={{ color: '#a0a0b0' }}>Always here to help</span>
            </div>
          </div>
        </div>
      </div>

      {/* Code Example */}
      <div style={{ marginTop: '60px' }}>
        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: 700,
          marginBottom: '24px',
          color: '#fff'
        }}>
          Code Example
        </h2>
        <pre style={{
          background: 'rgba(255, 255, 255, 0.05)',
          padding: '24px',
          borderRadius: '12px',
          overflow: 'auto',
          color: '#a0a0b0',
          fontSize: '0.9rem',
          lineHeight: 1.6
        }}>
{`import AgentiveRobot from './components/AgentiveRobot';
import './components/AgentiveRobot.css';

// Basic usage
<AgentiveRobot pose="idle" size={80} />

// With expression
<AgentiveRobot
  pose="waving"
  expression="happy"
  size={120}
/>

// Sleeping robot (for footer/24-7 messaging)
<AgentiveRobot
  pose="sleeping"
  animated={true}
/>

// Thinking robot (for loading states)
<AgentiveRobot
  pose="thinking"
  size={48}
  showLegs={false}
/>

// Celebrating (for success states)
<AgentiveRobot
  pose="celebrating"
  expression="excited"
/>

// Peeking from corner
<AgentiveRobot
  pose="peeking"
  peekFrom="bottom-right"
  expression="curious"
/>`}
        </pre>
      </div>
    </div>
  );
};

export default AgentiveRobotDemo;
