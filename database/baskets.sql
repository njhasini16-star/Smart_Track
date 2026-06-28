INSERT INTO course_baskets (course_id, basket_id)
SELECT 
  c.id,
  b.id
FROM courses c
JOIN baskets b
  ON b.name = 'Institute level Courses'
WHERE c.course_code IN (
'ES 101', 'ES 112', 'ES 113', 'ES 114', 'ES 115',
'ES 116', 'ES 117', 'ES 243', 'BS 192'
);

INSERT INTO course_baskets (course_id, basket_id, discipline_id)
SELECT 
  c.id,
  b.id,
  d.id
FROM courses c
JOIN baskets b
  ON b.name = 'Discipline Core Courses'
JOIN disciplines d
  ON d.code = 'AI'
WHERE c.course_code IN (
'CS 203', 'CS 303', 'CS 328', 'CS 329',
'CS 201', 'ES 215', 'ES 335', 'ES 242', 'ES 204'
);

INSERT INTO course_baskets (course_id, basket_id, discipline_id)
SELECT 
  c.id,
  b.id,
  d.id
FROM courses c
JOIN baskets b
  ON b.name = 'Discipline Electives'
JOIN disciplines d
  ON d.code = 'AI'
WHERE c.course_code IN (
'CS 333', 'CS 613', 'ES 615', 'ES 645', 'ES 659',
'ES 661', 'ES 666', 'ES 667', 'ES 670', 'ES 676',
'CS 301', 'CS 327', 'CS 432', 'CS 433', 'CS 436',
'EE 323', 'ES 214', 'ES 669'
) OR c.name IN (
'Reinforcement Learning', 'Game Theory', 'Knowledge Representation and Reasoning',
'Speech Technology', 'AI for Sustainability', 'AI for Earth Sciences', 
'AI for Biological Engineering', 'Software Engineering'
);

INSERT INTO course_baskets (course_id, basket_id, discipline_id)
SELECT 
  c.id,
  b.id,
  d.id
FROM courses c
JOIN baskets b
  ON b.name = 'Discipline Core Courses'
JOIN disciplines d
  ON d.code = 'CL'
WHERE c.course_code IN (
'ES 211', 'CL 202', 'CL 201', 'CL 203', 'CL 204',
'CL 205', 'CL 313', 'CL 314', 'CL 315', 'CL 316',
'CL 317', 'CL 325', 'CL 326', 'CL 327'
);

INSERT INTO course_baskets (course_id, basket_id, discipline_id)
SELECT 
  c.id,
  b.id,
  d.id
FROM courses c
JOIN baskets b
  ON b.name = 'Discipline Electives'
JOIN disciplines d
  ON d.code = 'CL'
WHERE c.course_code IN (
'BS 401', 'CL 324', 'CL 353', 'CL 426', 'CL 427', 'ES 604', 'ES 617', 
'ES 658', 'ES 662', 'ES 664', 'CL 601', 'CL 602', 'CL 604', 'CL 605', 
'CL 627', 'CL 628', 'CL 629', 'CL 630', 'CE 634'
);


INSERT INTO course_baskets (course_id, basket_id, discipline_id)
SELECT 
  c.id,
  b.id,
  d.id
FROM courses c
JOIN baskets b
  ON b.name = 'Discipline Core Courses'
JOIN disciplines d
  ON d.code = 'CE'
WHERE c.course_code IN (
'ES 221', 'CE 201', 'CE 303', 'CE 302', 'ES 212',
'CE 202', 'CE 310', 'CE 312', 'CE 301', 'CE 311', 'CE 403'
);


INSERT INTO course_baskets (course_id, basket_id, discipline_id)
SELECT 
  c.id,
  b.id,
  d.id
FROM courses c
JOIN baskets b
  ON b.name = 'Discipline Electives'
JOIN disciplines d
  ON d.code = 'CE'
WHERE c.course_code IN (
'CE 313', 'CE 314', 'CE 404', 'CE 307', 'CE 603', 'CE 605', 'CE 607', 
'CE 611', 'CE 613', 'CE 615', 'CE 622', 'CE 624', 'CE 625', 'CE 626', 
'CE 627', 'CE 628', 'CE 629', 'CE 631', 'CE 632', 'CE 634', 'CE 635', 
'CE 636', 'CE 638', 'CL 629', 'EH 610', 'ES 404', 'ES 607', 
'ES 621', 'ES 622', 'ES 624', 'ES 635', 'ES 646', 'ES 648', 'ES 651', 
'ES 652', 'ES 653', 'ES 660', 'ES 671', 'ME 605', 'ME 628', 'ME 640'
) OR c.name IN (
'Irrigation Engineering and Hydraulic Structures',
'Data Sciences for Earth Systems', 'Advance Design of (Steel/Concrete)', 
'Advance Courses in Transportation Engineering'
);

INSERT INTO course_baskets (course_id, basket_id, discipline_id)
SELECT 
  c.id,
  b.id,
  d.id
FROM courses c
JOIN baskets b
  ON b.name = 'Discipline Core Courses'
JOIN disciplines d
  ON d.code = 'CSE'
WHERE c.course_code IN (
'ES 242', 'ES 214', 'ES 204', 'ES 215',
'CS 201', 'CS 301', 'CS 202', 'CS 329', 'CS 331'
);



INSERT INTO course_baskets (course_id, basket_id, discipline_id)
SELECT 
  c.id,
  b.id,
  d.id
FROM courses c
JOIN baskets b
  ON b.name = 'Discipline Electives'
JOIN disciplines d
  ON d.code = 'CSE'
WHERE c.course_code IN (
'ES 335', 'ES 404', 'ES 615', 'ES 627', 'ES 637', 'ES 645', 'ES 659',
'ES 661', 'ES 666', 'ES 667', 'ES 669', 'ES 670', 'ES 676', 'ES 301', 
'CS 614', 'CS 617', 'CS 328', 'CS 327', 'CS 332', 'CS 431', 'CS 432', 
'CS 434', 'CS 435', 'CS 615', 'CS 616', 'ES 668'
);

INSERT INTO course_baskets (course_id, basket_id, discipline_id)
SELECT 
  c.id,
  b.id,
  d.id
FROM courses c
JOIN baskets b
  ON b.name = 'Discipline Core Courses'
JOIN disciplines d
  ON d.code = 'EE'
WHERE c.course_code IN (
'ES 244', 'EE 226', 'EE 331', 'EE 332', 'EE 333', 'ES 204', 'EE 312',
'EE 313', 'EE 323', 'EE 322', 'ES 245'
);

INSERT INTO course_baskets (course_id, basket_id, discipline_id)
SELECT 
  c.id,
  b.id,
  d.id
FROM courses c
JOIN baskets b
  ON b.name = 'Discipline Electives'
JOIN disciplines d
  ON d.code = 'EE'
WHERE c.course_code IN (
'CS 436', 'ES 215', 'ES 333', 'ES 412', 'ES 414', 'ES 416', 'ES 408', 
'ES 612', 'ES 613', 'ES 615', 'ES 616', 'ES 625', 'ES 626', 'ES 637',
'ES 641', 'ES 642', 'ES 655', 'ES 656', 'ES 657', 'ES 659', 'ES 662',
'ES 663', 'ES 665', 'ES 666', 'ES 667', 'ES 668', 'ES 669', 'ES 670',
'ES 675', 'ES 676', 'PH 643'
);

INSERT INTO course_baskets (course_id, basket_id, discipline_id)
SELECT 
  c.id,
  b.id,
  d.id
FROM courses c
JOIN baskets b
  ON b.name = 'Discipline Core Courses'
JOIN disciplines d
  ON d.code = 'ICDT'
WHERE c.course_code IN (
'ES 244', 'EE 226', 'ES 215', 'ES 204', 'EE 322', 'EE 225', 'EE 227', 'ES 339'
) OR c.name IN (
'Semiconductor Material & Device Characterization', 'IC Fabrication & Manufacturing',
'Thin Film Science & Vacuum Technology', 'Semiconductor Package Assembly & Manufacturing'
);

INSERT INTO course_baskets (course_id, basket_id, discipline_id)
SELECT 
  c.id,
  b.id,
  d.id
FROM courses c
JOIN baskets b
  ON b.name = 'Discipline Electives'
JOIN disciplines d
  ON d.code = 'ICDT'
WHERE c.course_code IN (
'CS 436', 'EE 651', 'EE 660', 'ES 246', 'ES 672'
) OR c.name IN (
'Compound Semiconductor Devices & Circuits',
'Design for Test',
'Display Technology and Manufacturing',
'Fundamentals of MEMS/NEMS',
'Manufacturing Process Control',
'Memory Devices, Circuits & Systems',
'Nanoscale Devices',
'Physics and Manufacturing of Solar Cells',
'Power Semiconductor Devices',
'RF IC Design',
'VLSI Physical Design: Netlist to GDSII'
);

INSERT INTO course_baskets (course_id, basket_id, discipline_id)
SELECT 
  c.id,
  b.id,
  d.id
FROM courses c
JOIN baskets b
  ON b.name = 'Discipline Core Courses'
JOIN disciplines d
  ON d.code = 'MSE'
WHERE c.course_code IN (
'MSE 207', 'MSE 202', 'MSE 204', 'MSE 201', 'MSE 206', 'MSE 205',
'MSE 313', 'MSE 307'
) OR c.name IN (
'Corrosion and Degradation of Materials', 'Materials & Environment'
);

INSERT INTO course_baskets (course_id, basket_id, discipline_id)
SELECT 
  c.id,
  b.id,
  d.id
FROM courses c
JOIN baskets b
  ON b.name = 'Discipline Electives'
JOIN disciplines d
  ON d.code = 'MSE'
WHERE c.course_code IN (
'ES 415', 'ES 623', 'MSE 203', 'MSE 209', 'MSE 210', 'MSE 302', 'MSE 303',
'MSE 304', 'MSE 305', 'MSE 306', 'MSE 310', 'MSE 311', 'MSE 312', 'MSE 314', 'MSE 315',
'MSE 316', 'MSE 317', 'MSE 318', 'MSE 352', 'MSE 354','MSE 355', 'MSE 401',
'MSE 402', 'MSE 403', 'MSE 404', 'MSE 603', 'MSE 604', 'MSE 605', 'MSE 621', 'MSE 622',
'MSE 624','MSE 625', 'MSE 626', 'MSE 627', 'MSE 628', 'MSE 629','MSE 630', 
'MSE 631', 'MSE 633', 'MSE 632', 'MSE 634', 'MSE 635', 'MSE 636'
);

INSERT INTO course_baskets (course_id, basket_id, discipline_id)
SELECT 
  c.id,
  b.id,
  d.id
FROM courses c
JOIN baskets b
  ON b.name = 'Discipline Core Courses'
JOIN disciplines d
  ON d.code = 'ME'
WHERE c.course_code IN (
'ES 211', 'ME 206', 'ME 207', 'ME 208', 'ME 209', 'ES 221', 'ME 334',
'ME 333', 'ME 362', 'ES 245', 'ME 322', 'ME 337', 'ES 337'
);

INSERT INTO course_baskets (course_id, basket_id, discipline_id)
SELECT 
  c.id,
  b.id,
  d.id
FROM courses c
JOIN baskets b
  ON b.name = 'Discipline Electives'
JOIN disciplines d
  ON d.code = 'ME'
WHERE c.course_code IN (
'CL 324', 'CS 435', 'ES 214', 'ES 408', 'ES 607', 'ES 604', 'ES 641',
'ES 642', 'MSE 313', 'MSE 632', 'ES 646', 'ES 648', 'ES 653', 'ES 656',
'ES 621', 'ES 622', 'ES 631', 'ES 632', 'ES 613', 'ES 616'
);

INSERT INTO course_baskets (course_id, basket_id)
SELECT 
  c.id,
  b.id
FROM courses c
JOIN baskets b
  ON b.name = 'Science Basket'
WHERE c.course_code IN (
'PH 201', 'PH 202', 'PH 203', 'PH 404', 'PH 503', 'PH 505', 'PH 507',
'PH 508', 'PH 509', 'PH 510', 'CH 203', 'CH 204', 'CH 302', 'CH 401',
'CH 511', 'CG 503', 'CG 505', 'EH 303', 'EH 304', 'EH 601', 'EH 602', 
'EH 605', 'EH 608', 'EH 611', 'EH 612', 'EH 619', 'EH 621'
);

INSERT INTO course_baskets (course_id, basket_id)
SELECT
  c.id,
  b.id
FROM courses c
JOIN baskets b
  ON b.name = 'Math Basket'
WHERE c.course_code IN (
'MA 204', 'MA 205', 'MA 206'
);


INSERT INTO course_baskets (course_id, basket_id)
SELECT
  c.id,
  b.id
FROM courses c
JOIN baskets b
  ON b.name = 'Materials Basket'
WHERE c.course_code IN (
'ES 118', 'MSE 211', 'MSE 314'
);

INSERT INTO course_baskets (course_id, basket_id)
SELECT
  c.id,
  b.id
FROM courses c
JOIN baskets b
  ON b.name = 'HSS Basket'
WHERE c.course_code IN (
'HS 191', 'HS 192', 'HS 151', 'GE 101', 'GE 201'
);