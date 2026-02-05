BEGIN TRANSACTION;

DELETE FROM Courses;
DELETE FROM Services;
DELETE FROM AboutUsAccordions;
DELETE FROM FunFacts;
DELETE FROM Testimonials;
DELETE FROM Events;
DELETE FROM TeamMembers;
DELETE FROM Banners;

-- Reset identity manually
DBCC CHECKIDENT ('Courses', RESEED, 0);
DBCC CHECKIDENT ('Services', RESEED, 0);
DBCC CHECKIDENT ('AboutUsAccordions', RESEED, 0);
DBCC CHECKIDENT ('FunFacts', RESEED, 0);
DBCC CHECKIDENT ('Testimonials', RESEED, 0);
DBCC CHECKIDENT ('Events', RESEED, 0);
DBCC CHECKIDENT ('TeamMembers', RESEED, 0);
DBCC CHECKIDENT ('Banners', RESEED, 0);

COMMIT;


INSERT INTO Courses (Image, Category, CategoryClass, Title, Author, Price)
VALUES
('https://picsum.photos/id/1011/600/400','Web Design','design','Learn Web Design','Stella Blair',160),
('https://picsum.photos/id/1012/600/400','Development','code','JavaScript Essentials','John Smith',180),
('https://picsum.photos/id/1013/600/400','UI/UX','design','UI UX Fundamentals','Emma Watson',140),
('https://picsum.photos/id/1014/600/400','Backend','code','ASP.NET Core Mastery','David Miller',200),
('https://picsum.photos/id/1015/600/400','Frontend','design','Advanced CSS','Sophia Turner',130),
('https://picsum.photos/id/1016/600/400','Database','code','SQL for Developers','Robert King',150),
('https://picsum.photos/id/1018/600/400','DevOps','code','Docker & CI/CD','Chris Evans',220),
('https://picsum.photos/id/1020/600/400','Mobile','design','Flutter Basics','Olivia Brown',170),
('https://picsum.photos/id/1024/600/400','Cloud','code','Azure Fundamentals','Daniel Scott',190),
('https://picsum.photos/id/1025/600/400','Security','code','Web Security Basics','Liam Wilson',165);


INSERT INTO Services (Title, Description, Icon, Link)
VALUES
('Online Degrees','Flexible online degree programs.','https://picsum.photos/id/201/200/200','#'),
('Short Courses','Quick skill-based learning paths.','https://picsum.photos/id/202/200/200','#'),
('Expert Teachers','Learn from industry experts.','https://picsum.photos/id/203/200/200','#'),
('Certifications','Get recognized certificates.','https://picsum.photos/id/204/200/200','#'),
('Career Guidance','Personal career mentoring.','https://picsum.photos/id/205/200/200','#'),
('Live Classes','Interactive live sessions.','https://picsum.photos/id/206/200/200','#'),
('Recorded Content','Access lessons anytime.','https://picsum.photos/id/207/200/200','#'),
('Projects','Hands-on real projects.','https://picsum.photos/id/208/200/200','#'),
('Community','Join learner community.','https://picsum.photos/id/209/200/200','#'),
('Support','24/7 student support.','https://picsum.photos/id/210/200/200','#');


 INSERT INTO AboutUsAccordions (AccordionKey, Title, Content)
VALUES
('One','Who we are','We are a modern online education platform.'),
('Two','Our mission','To make learning accessible for everyone.'),
('Three','Our vision','Empower learners worldwide.'),
('Four','Teaching style','Practical and project-based.'),
('Five','Our team','Experienced industry professionals.'),
('Six','Learning mode','Self-paced and live learning.'),
('Seven','Certifications','Industry-recognized certificates.'),
('Eight','Community','Supportive learning environment.'),
('Nine','Support','Dedicated learner support.'),
('Ten','Growth','Continuous improvement and innovation.');


INSERT INTO FunFacts (Label, Value, Speed)
VALUES
('Happy Students',150,1000),
('Online Courses',80,900),
('Expert Teachers',25,850),
('Years Experience',10,800)

INSERT INTO Testimonials (Message, Name, Role, Image)
VALUES
('Amazing learning experience.','Claude David','Full Stack Master','https://picsum.photos/id/64/200/200'),
('Courses are very practical.','Sarah Johnson','Frontend Developer','https://picsum.photos/id/65/200/200'),
('Great mentors and support.','Michael Lee','UI Designer','https://picsum.photos/id/66/200/200'),
('Helped me switch careers.','Emma Brown','Backend Developer','https://picsum.photos/id/67/200/200'),
('Very well structured content.','Daniel Scott','Software Engineer','https://picsum.photos/id/68/200/200'),
('Loved the live sessions.','Olivia White','Student','https://picsum.photos/id/69/200/200'),
('Perfect for beginners.','James Green','Junior Dev','https://picsum.photos/id/70/200/200'),
('Real-world projects helped a lot.','Sophia Black','Product Designer','https://picsum.photos/id/71/200/200'),
('Support team is excellent.','William Adams','QA Engineer','https://picsum.photos/id/72/200/200'),
('Highly recommended.','Ava Nelson','Tech Lead','https://picsum.photos/id/73/200/200');


 INSERT INTO Events (Image, Category, Title, EventDate, DurationHours, Price)
VALUES
('https://picsum.photos/id/1050/600/400','Web Design','UI Best Practices','2036-02-17',22,120),
('https://picsum.photos/id/1051/600/400','Development','Modern JavaScript','2036-03-05',18,100),
('https://picsum.photos/id/1052/600/400','UI/UX','Design Thinking','2036-04-10',12,80),
('https://picsum.photos/id/1053/600/400','Backend','ASP.NET Deep Dive','2036-05-01',24,150),
('https://picsum.photos/id/1054/600/400','Database','SQL Performance','2036-06-15',16,110),
('https://picsum.photos/id/1055/600/400','DevOps','Docker Workshop','2036-07-20',14,90),
('https://picsum.photos/id/1056/600/400','Cloud','Azure Bootcamp','2036-08-18',20,140),
('https://picsum.photos/id/1057/600/400','Security','Web Security','2036-09-12',10,70),
('https://picsum.photos/id/1058/600/400','Mobile','Flutter Live','2036-10-08',12,85),
('https://picsum.photos/id/1059/600/400','AI','AI for Developers','2036-11-22',18,160);


INSERT INTO TeamMembers (Name, Role, Image)
VALUES
('Sophia Rose', 'UX Teacher', 'https://picsum.photos/id/1005/400/400'),
('James Anderson', 'Frontend Developer', 'https://picsum.photos/id/1001/400/400'),
('Linda Brown', 'UI Designer', 'https://picsum.photos/id/1006/400/400'),
('Michael Clark', 'Backend Developer', 'https://picsum.photos/id/1011/400/400'),
('Emma Wilson', 'Product Manager', 'https://picsum.photos/id/1012/400/400'),
('Daniel Lee', 'Cloud Architect', 'https://picsum.photos/id/1013/400/400'),
('Olivia Martin', 'QA Engineer', 'https://picsum.photos/id/1014/400/400'),
('William Harris', 'DevOps Engineer', 'https://picsum.photos/id/1015/400/400'),
('Ava Thompson', 'Mobile Developer', 'https://picsum.photos/id/1016/400/400'),
('Noah Garcia', 'Security Expert', 'https://picsum.photos/id/1018/400/400');


INSERT INTO Banners (Class, Category, Title, Description, PlayText, IsActive)
VALUES
('item-1','Our Courses','Learn From Experts','High quality professional courses.','Watch Now',1),
('item-2','Online Learning','Anytime Anywhere','Learn at your own pace.','Explore',1),
('item-3','Certifications','Get Certified','Boost your career.','View Courses',1),
('item-1','Live Classes','Interactive Learning','Join live sessions.','Join Now',1),
('item-2','Community','Grow Together','Learn with peers.','Join Community',1),
('item-3','Career','Career Support','Mentorship and guidance.','Get Help',1),
('item-1','Workshops','Hands-on Workshops','Practice real skills.','Register',1),
('item-2','Projects','Real Projects','Build portfolio projects.','Start Building',1),
('item-3','Success','Student Success','Stories that inspire.','Read Stories',0),
('item-1','Join Us','Start Today','Your future begins here.','Get Started',1);

